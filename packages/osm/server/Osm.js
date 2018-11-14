
var Future = Npm.require('fibers/future'),
	Overpass = Npm.require('query-overpass');

Kepler.Osm = {

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

	queryBuilder: function(o, loc) {
		
		//TODO [timeout:1];
		var queryTmplId = '{type}({id});',
			queryTmplAround = '{type}(around:{dist},{lat},{lon})[{filter}];',
			queryTmplBbox = '{type}({bbox})[{filter}];',
			queryTmpl = queryTmplAround,
			query = '',
			head = '[out:json];',
			tags = '',
			foot = '',
			bbox = '',
			union = '(._;>;);';

		var opts = _.defaults(o || {}, {
			id: '',
			type: 'node',
			filter: '~".*"~"."',
			dist: K.settings.osm.findByLocDist,
			limit: K.settings.osm.findByLocLimit,
			meta: K.settings.osm.overpassMeta
		});

		if(opts.id) {
			
			queryTmpl = queryTmplId;
			
			tags = K.Util.tmpl(queryTmpl, {
				id: opts.id,
				type: opts.type
			});

			union = '';	
		}
		else {
			if(opts.type=='way') {
				queryTmpl = queryTmplBbox;
				//union = 'way(bn);'+union;

				/*
				//for debug opts.dist directly in browser console
				L.rectangle(K.Util.geo.bufferLoc(K.Map.getCenter(), 100, true)).addTo(K.Map.map)
				*/

				bbox = K.Util.geo.bufferLoc(loc, opts.dist).join(',');
			}

			if(_.isArray(opts.filter)) {
			
				//TODO rewrite using regexpression for multiple keys value 

				tags += '(';
				for(var f in opts.filter) {
					tags += K.Util.tmpl(queryTmpl, {

						bbox: bbox,
						
						lat: loc[0],
						lon: loc[1],

						type: opts.type,
						dist: opts.dist,
						filter: opts.filter[f],
					});
				}
				tags += ');';

			}else{

				tags = K.Util.tmpl(queryTmpl, {
					
					bbox: bbox,
					
					lat: loc[0],
					lon: loc[1],

					type: opts.type,
					dist: opts.dist,
					filter: opts.filter
				});
			}		
		}	

		foot = K.Util.tmpl('out{meta} {limit};', {
			meta: opts.meta ? ' meta' : '',
			limit: opts.limit
		});

		query = head + tags + union + foot;

		console.log('Osm: queryBuilder ','"'+query+'"');

		return query;
	},
	
	findOsmByLoc: function(loc, opts) {
		
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

	findOsmById: function(osmId) {

		var query = this.queryBuilder({id: osmId});

		console.log('Osm: findOsmById', osmId);

		return this.overpassSync(query);
	}	
};


Meteor.methods({
	findOsmByLoc: function(loc, opts) {
		
		if(!this.userId) return null;

		return K.Osm.findOsmByLoc(loc, opts);
	},

	findOsmById: function(osmId) {
		
		if(!this.userId) return null;
		
		return K.Osm.findOsmById(osmId);
	}
});