
var Future = Npm.require('fibers/future'),
		Overpass = Npm.require('query-overpass');

Kepler.Osm = {

	overpassSync: function(query) {

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

	queryBuilder: function(loc, opts) {
		
		//TODO [timeout:1];
		var head = '[out:json];',
				tags = '',
				foot = '';

		opts = _.defaults(opts || {}, {
			type: 'node',
			filter: '~".*"~"."',
			radius: K.settings.osm.findByLocDist,
			limit: K.settings.osm.findByLocLimit,
			meta: K.settings.osm.overpassMeta,			
		});

		if(_.isArray(opts.filter)) {
			tags += '(';
			for(var f in opts.filter) {
				tags += _.template('{type}(around:{radius},{lat},{lon})[{filter}];', {
					lat: loc[0],
					lon: loc[1],
					radius: opts.radius,				 
					filter: opts.filter[f],
					type: opts.type,			 
				});
			}
			tags += ');(._;>;);';
		}else{
			tags = _.template('{type}(around:{radius},{lat},{lon})[{filter}];', {
				lat: loc[0],
				lon: loc[1],
				radius: opts.radius,				 
				filter: opts.filter,
				type: opts.type,			 
			});
		}

		foot = _.template('out{meta} {limit};', {
			meta: opts.meta ? ' meta' : '',
			limit: opts.limit
		});

		return head+tags+foot;
	},
	
	findOsmByLoc: function(loc, opts) {

		var query = this.queryBuilder(loc, opts);

		console.log('Osm: findOsmByLoc');

		return this.overpassSync(query);
	},

	findOsmByBBox: function(bbox, opts) {

		opts = _.defaults(opts || {}, {
			type: 'node',
			filter: '~".*"~"."',
			meta: K.settings.osm.overpassMeta,
			limit: K.settings.osm.findByBBoxLimit,
		});

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