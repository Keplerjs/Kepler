
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
			
		var loc = K.Util.geo.locRound(loc),
			out = '',
			head = '[out:json];', //TODO [timeout:1];
			filter = '',
			tail = '',
			//bbox = '',
			types = ['node'],	//way,rel
			tags = ['~".*"~"."'],	//all values
			union = '(._;>;);';		//for grouping nodes
		
		var tmplId = '{type}({id});',
			tmplAround = '{type}(around:{dist},{lat},{lon})[{tag}];',
			//tmplBbox = '{type}({bbox})[{tag}];',
			tmplTail = 'out {meta};out geom;out {limit};',
			tmpl = tmplAround;

		var opts = _.defaults(options || {}, {
			id: '',
			types: types,
			tags: tags,
			dist: K.settings.osm.findByLocDist,
			limit: K.settings.osm.findByLocLimit,
			meta: K.settings.osm.overpassMeta
		});

		opts.tags = _.isArray(opts.tags) ? opts.tags : [opts.tags];
		opts.types = _.isArray(opts.types) ? opts.types : [opts.types];

		if(opts.id) {

			let osmid = opts.id.split('/');

			filter = K.Util.tmpl(tmplId, {
				type: osmid[0],
				id: osmid[1]
			});
		}
		else
		{
			filter = "(\n";
			
			_.each(opts.types, function(type) {
				_.each(opts.tags, function(tag) {
					filter += K.Util.tmpl(tmpl, {
						//bbox: bbox,
						lat: loc[0],
						lon: loc[1],
						dist: opts.dist,
						type: type,
						tag: tag
					})+"\n";
				});
			});

			filter += "\n);";
		}

		tail = K.Util.tmpl(tmplTail, {
			meta: opts.meta ? 'meta' : '',
			limit: opts.limit
		});

		out = [head, filter, union, tail].join("\n");

		console.log('Osm: queryBuilder');
		console.log(out);

		return out;
	},
	
	findByLoc: function(loc, opts) {
		
		var query = this.queryBuilder(opts, loc);

		var geojson = this.overpassSync(query),
			features = geojson.features;
		
		for(var f in features) {
			if( features[f] && features[f].properties) {
				
				if(opts.meta!==true && features[f].properties.meta)
					delete features[f].properties.meta;
				
				if(!_.contains(opts.types,'rel') && features[f].properties.relations)
					delete features[f].properties.relations;
			}
		}
		
		console.log('Osm: findByLoc', loc);

		return geojson;
	},

	findById: function(osmId) {

		var query = this.queryBuilder({id: osmId}),
			geojson = this.overpassSync(query);

		console.log('Osm: findOsmById', osmId);

		return geojson;
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