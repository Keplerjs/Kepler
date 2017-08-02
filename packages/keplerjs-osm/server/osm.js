
//TODO rename this file in Osm.js and use K.Osm.methods.. namespace

var Future = Npm.require('fibers/future'),
    Overpass = Npm.require('query-overpass');

Meteor.methods({
  
  findOsmById: function(osmId) {
    
    if(!this.userId) return null;
    
    var query = _.template('[out:json];{type}({id});out {meta};', {
        id: osmId,
        type: 'node',
        meta: '',//'meta'
      });

    console.log('findOsmById', query);

    var future = new Future();

    Overpass(query, function(err, resp) {
      if(err)
        future.throw(err);
      else
        future.return(resp);
    });

    return future.wait();
  },

  findOsmByLoc: function(loc, filter) {
    
    if(!this.userId) return null;
    
    var query = _.template('[out:json];{type}(around:{radius},{lat},{lon}){filter};out {meta} {limit};', {
        lat: loc[0], lon: loc[1],
        filter: filter ? '['+filter+']' : '',
        type: 'node',
        meta: '',//'meta',
        radius: 30,
        limit: 1
      });

    console.log('findOsmByLoc', query);

    var future = new Future();

    Overpass(query, function(err, resp) {
      if(err)
        future.throw(err);
      else
        future.return(resp);
    });

    return future.wait();
  },

	findOsmByBBox: function(filter, bb, type) {
		
		if(!this.userId) return null;
		
		var query = _.template('[out:json];{type}({lat1},{lon1},{lat2},{lon2}){filter};out;', {
				lat1: bb[0][0], lon1: bb[0][1],
				lat2: bb[1][0], lon2: bb[1][1],
				type: type || 'node',
				filter: filter ? '['+filter+']' : ''
			});
		
    console.log('findOsmByBBox', query);

		var future = new Future();

		Overpass(query, function(err, resp) {
			if(err)
				future.throw(err);
			else
				future.return(resp);
		});

		return future.wait();
	}
});
