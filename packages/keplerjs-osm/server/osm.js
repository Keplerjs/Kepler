
var Future = Npm.require('fibers/future');

Meteor.methods({
	getOsmByBBox: function(filter, bb, type) {
		
		if(!this.userId) return null;
		
		var query = _.template('[out:json];{type}({lat1},{lon1},{lat2},{lon2}){filter};out;', {
				lat1: bb[0][0], lon1: bb[0][1],
				lat2: bb[1][0], lon2: bb[1][1],
				type: type || 'node',
				filter: filter ? '['+filter+']' : ''
			});
		
		var future = new Future();

		console.log('overpass', query);

		Overpass(query, function(err, resp) {
			if(err)
				future.throw(err);
			else
				future.return(resp);
		});

//TODO
/*
var key = f.id,
	val = K.cache.get(key, 'overpass');
return val || K.cache.set(key, ... , 'overpass');
*/
		return future.wait();
	},
	getOsmByNear: function(filter, ll, type) {
		
		if(!this.userId) return null;
// meta
		var query = _.template('[out:json];{type}(around:{radius},{lat},{lon}){filter};out;', {
				lat: ll[0], lon: ll[1],
				filter: filter ? '['+filter+']' : '',
				type: type || 'node',
				radius: 1200
			});
				
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