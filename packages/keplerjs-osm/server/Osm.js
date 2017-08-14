
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

	queryBuilder: function(loc, o) {
		
		//TODO [timeout:1];
		var queryTmplAround = '{type}(around:{dist},{lat},{lon})[{filter}];',
			queryTmplBbox = '{type}({bbox})[{filter}];',
			queryTmpl = queryTmplAround,
			query = '',
			head = '[out:json];',
			tags = '',
			foot = '',
			union = '(._;>;);';

		var opts = _.defaults(o || {}, {
			type: 'node',
			filter: '~".*"~"."',
			dist: K.settings.osm.findByLocDist,
			limit: K.settings.osm.findByLocLimit,
			meta: K.settings.osm.overpassMeta
		});

		//console.log('Osm: queryBuilder',opts)

		if(opts.type=='way') {
			queryTmpl = queryTmplBbox;
			//union = 'way(bn);'+union;
			var b = K.Util.geo.meters2rad(opts.dist),
				lat1 = parseFloat(loc[0]-b).toFixed(4),
				lon1 = parseFloat(loc[1]-b).toFixed(4),
				lat2 = parseFloat(loc[0]+b).toFixed(4),
				lon2 = parseFloat(loc[1]+b).toFixed(4);

			//{lat1},{lon1},{lat2},{lon2}

			bbox = [lat1,lon1,lat2,lon2].join(',');

		}

		if(_.isArray(opts.filter)) {
		
			//TODO rewrite using regexpression for multiple keys value 

			tags += '(';
			for(var f in opts.filter) {
				tags += _.template(queryTmpl, {

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

			tags = _.template(queryTmpl, {
				
				bbox: bbox,
				
				lat: loc[0],
				lon: loc[1],

				type: opts.type,
				dist: opts.dist,
				filter: opts.filter
			});
		}			

		foot = _.template('out{meta} {limit};', {
			meta: opts.meta ? ' meta' : '',
			limit: opts.limit
		});

		query = head+tags+union+foot;

		console.log('Osm: queryBuilder ','"'+query+'"');

		return query;
	},
	
	findOsmByLoc: function(loc, opts) {

		//TODO for way generrate buffer of location and use findOsmByBBox
		//https://stackoverflow.com/questions/44929064/how-to-get-bounding-box-based-on-distance-from-given-point
		
		var query = this.queryBuilder(loc, opts);

		var geojson = this.overpassSync(query);

		return  geojson;
	},

	findOsmByBBox: function(bbox, opts) {

		opts = _.defaults(opts || {}, {
			type: 'node',
			filter: '~".*"~"."',
			meta: K.settings.osm.overpassMeta,
			limit: K.settings.osm.findByBBoxLimit,
		});

		//TODO move to queryBuilder
		var query = _.template('[out:json];{type}({lat1},{lon1},{lat2},{lon2})[{filter}];(._;>;);out{meta} {limit};', {
			lat1: bbox[0][0], lon1: bbox[0][1],
			lat2: bbox[1][0], lon2: bbox[1][1],
			filter: opts.filter,
			type: opts.type, 
			meta: opts.meta ? ' meta' : '',
			limit: opts.limit
		});
		
		console.log('Osm: findOsmByBBox', bbox);

		return this.overpassSync(query);
	},

	findOsmById: function(osmId) {
		
		//TODO move to queryBuilder
		var query = _.template('[out:json];{type}({id});out{meta};', {
				id: osmId,
				type: 'node',
				meta: K.settings.osm.overpassMeta ? ' meta' : ''
			});

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
	},

	findOsmByBBox: function(bb, opts) {
		
		if(!this.userId) return null;

		return K.Osm.findOsmByBBox(bb, opts)
	}
});