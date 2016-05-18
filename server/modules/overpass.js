
var Future = Npm.require('fibers/future');

Meteor.methods({
	overpass: function(filter, bbox, options) {
		
		if(!this.userId) return null;
		
		console.log('overpass', query);
		
		var query = _.template('[out:json];node({lat1},{lon1},{lat2},{lon2})[{filter}];out;', {
				lat1: bbox[0][0], lon1: bbox[0][1],
				lat2: bbox[1][0], lon2: bbox[1][1],
				filter: filter
			});

		/*
		var key = f.id,
			val = K.cache.get(key, 'overpass');
		return val || K.cache.set(key, ... , 'overpass');
		*/
		
		var future = new Future();

		Overpass(query, function(err, resp) {
			
			console.log(err, JSON.stringify(resp) );
			
			if(err)
				future.throw(err);
			else
				future.return(resp);
			
		}, options);

		return future.wait();
	}
});