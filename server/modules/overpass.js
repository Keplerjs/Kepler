
var Future = Npm.require('fibers/future');

Meteor.methods({
	getOverpassByBBox: function(filter, ll, options) {
		
		if(!this.userId) return null;
		
		var queryBbox = _.template('[out:json];node({lat1},{lon1},{lat2},{lon2})[{filter}];out;', {
				lat1: ll[0][0], lon1: ll[0][1],
				lat2: ll[1][0], lon2: ll[1][1],
				filter: filter
			}),
			queryNear = _.template('[out:json];node(around:{radius},{lat},{lon})[{filter}];out;', {
				lat: ll[0], lon: ll[1],
				radius: Meteor.settings.public.maxPoisDist,
				filter: filter
			}),
			query = queryBbox;
		/*
		var key = f.id,
			val = K.cache.get(key, 'overpass');
		return val || K.cache.set(key, ... , 'overpass');
		*/
		
		var future = new Future();

		console.log('overpass', query);

		Overpass(query, function(err, resp) {
			if(err)
				future.throw(err);
			else
				future.return(resp);
		});

		return future.wait();
	}
});