
var Future = Npm.require('fibers/future'),
	Overpass = Npm.require('query-overpass');

Kepler.Osm = {

	osmToPlace: function(osm) {

		var feature = osm.features[0],
			tags = feature.properties.tags,
			geom = feature.geometry,
			loc = K.Util.geo.centroid(geom);

		var place = {
			loc: loc,
			geometry: geom,
			osm: feature,
			source: {
				type: 'osm'
			}
		};

		if(tags.name)
			place.name = K.Util.sanitize.name(tags.name);

		if(tags.website)
			place.url = K.Util.sanitize.url(tags.website);
		
		return place;
	},

	overpassSync: function(query) {

		//TODO here implement caching system

		var future = new Future();

		Overpass(query, function(err, resp) {
			
			if(err) {
				console.log('Osm: overpass error', err)
				future.throw(err);
			}
			else
				future.return(resp); 
			
		}, K.settings.osm.overpass);

		return future.wait();
	},

	queryBuilder: function(options, loc) {

		//docs https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example
		
		var query = '',
			head = '[out:json];', //TODO [timeout:1];
			filter = '',
			tail = '',
			bbox = '',
			type = 'node',	//way,rel
			tags = '~".*"~"."',	//all values
			union = '(._;>;);';		//for gropuping nodes
		
		var tmplId = '{type}({id});',
			tmplAround = '{type}(around:{dist},{lat},{lon})[{tags}];',
			tmplBbox = '{type}({bbox})[{tags}];',
			tmplTail = 'out{meta} {limit};',
			tmpl = tmplAround;

		var opts = _.defaults(options || {}, {
			id: '',
			type: type,
			tags: tags,
			dist: K.settings.osm.findByLocDist,
			limit: K.settings.osm.findByLocLimit,
			meta: K.settings.osm.overpassMeta
		});
		
		if(opts.type==='way') {
			tmpl = tmplBbox;
			bbox = K.Util.geo.locBuffer(loc, opts.dist).join(',');
		}

		if(opts.id) {

			filter = K.Util.tmpl(tmplId, {
				id: opts.id,
				type: opts.type
			});

			union = '';	
		}
		else
		{
			if(_.isArray(opts.tags))
			{
				filter = '(';

				for(var k in opts.tags) {

					filter += K.Util.tmpl(tmpl, {
						bbox: bbox,
						lat: loc[0],
						lon: loc[1],
						type: opts.type,
						dist: opts.dist,
						tags: opts.tags[k],
					});
				}

				filter += ");\n";
			}
			else
			{
				filter = K.Util.tmpl(tmpl, {
					bbox: bbox,
					lat: loc[0],
					lon: loc[1],
					type: opts.type,
					dist: opts.dist,
					tags: opts.tags
				});
			}		
		}

		tail = K.Util.tmpl(tmplTail, {
			meta: opts.meta ? ' meta' : '',
			limit: opts.limit
		});

		query = [head, filter, union, tail].join("\n");

		console.log('Osm: queryBuilder',query);

		return query;
	},
	
	findByLoc: function(loc, opts) {
		
		var query = this.queryBuilder(opts, loc);

		var geojson = this.overpassSync(query),
			features = geojson.features;
		
		for(var f in features) {
			if( features[f] && features[f].properties) {
				
				if(opts.meta!==true && features[f].properties.meta)
					delete features[f].properties.meta;
				
				if(opts.type!=='rel' && features[f].properties.relations)
					delete features[f].properties.relations;
			}
		}
		
		return geojson;
	},

	findById: function(osmId) {

		var query = this.queryBuilder({id: osmId});

		console.log('Osm: findOsmById', osmId);

		return this.overpassSync(query);
	}
};

Meteor.methods({
	findOsmByLoc: function(loc, opts) {
		
		if(!this.userId) return null;

		return K.Osm.findByLoc(loc, opts);
	},

	findOsmById: function(osmId) {
		
		if(!this.userId) return null;
		
		return K.Osm.findById(osmId);
	}
});

/* OSM data structure
{
   "type":"Feature",
   "id":"node/3517622759",
   "properties":{
      "type":"node",
      "id":3517622759,
      "tags":{
         "amenity":"restaurant",
      },
      "relations":[],
      "meta":{}
   },
   "geometry":{
      "type":"Point",
      "coordinates":[12.5123636,41.8814402]
   }
}
*/