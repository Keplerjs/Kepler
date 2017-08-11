
//TODO rename this file in Osm.js and use K.Osm.methods.. namespace

var Future = Npm.require('fibers/future'),
    Overpass = Npm.require('query-overpass');

var overOpts = {
  meta: true,
  flatProperties: false,
  //overpassUrl: "http://overpass-api.de/api/interpreter"
};
/*
overpassUrl:"http://overpass.osm.rambler.ru/cgi/interpreter"
overpassUrl:"http://api.openstreetmap.fr/oapi/interpreter"
*/
Kepler.Osm = {

  //TODO method for OverpassSync

  queryBuilder: function(loc, opts) {
    
    //TODO [timeout:1];
    var head = '[out:json];',
        tags = '',
        foot = '';

    opts = _.defaults(opts || {}, {
      type: 'node',
      filter: '~".*"~"."',
      radius: 20,
      meta: overOpts.meta,
      limit: 1,
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

    console.log('Osm: findOsmByLoc', '"'+query+'"');
    //console.log("https://overpass-api.de/api/interpreter?data="+encodeURIComponent(query));

    var future = new Future();

    Overpass(query, function(err, resp) {
      if(err) {
        console.log('Osm: overpass error', err)
        future.throw(err);
      }
      else
        future.return(resp);
    }, overOpts);

    return future.wait();
  },

  findOsmById: function(osmId) {
    
    var query = _.template('[out:json];{type}({id});out{meta};', {
        id: osmId,
        type: 'node',
        meta: overOpts.meta ? ' meta' : ''
      });

    console.log('Osm: findOsmById', '"'+query+'"');

    var future = new Future();

    Overpass(query, function(err, resp) {
      if(err)
        future.throw(err);
      else
        future.return(resp);
    }, overOpts);

    return future.wait();
  },

	findOsmByBBox: function(bbox, opts) {

    opts = _.defaults(opts || {}, {
      type: 'node',
      filter: '~".*"~"."',
      meta: overOpts.meta,
      limit: 10,
    });

		var query = _.template('[out:json];{type}({lat1},{lon1},{lat2},{lon2})[{filter}];out;', {
			lat1: bbox[0][0], lon1: bbox[0][1],
			lat2: bbox[1][0], lon2: bbox[1][1],
			meta: opts.meta ? ' meta' : '',        
			filter: opts.filter,
			type: opts.type,       
			limit: opts.limit
		});
		
    console.log('Osm: findOsmByBBox', query);
    //console.log("https://overpass-api.de/api/interpreter?data="+encodeURIComponent(query));

		var future = new Future();

		Overpass(query, function(err, resp) {
			if(err){
        console.log('Osm: overpass error', err)
				future.throw(err);
      }
			else
				future.return(resp);
		}, overOpts);

		return future.wait();
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