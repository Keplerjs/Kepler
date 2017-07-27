
var Future = Npm.require('fibers/future');

var cacheGeoinfo = true
	roundLocGeoinfo = 4;

/*Meteor.startup(function() {
	_.each(geoFields, function(opt,field) {
		console.log('Geoinfo: cache clean ', opt.name);
		K.Cache.clean(opt.name);
	});
});*/

var geoFields = {
	ele: {
		name: 'elevation',
		cache: true,
		roundLoc: 8,
		func: K.Geoapi.elevationAPILocal
	},
	esp: {
		name: 'aspect',
		cache: true,
		roundLoc: 8,
		func: K.Geoapi.aspectAPILocal
	},
	near: {
		name: 'near',
		cache: true,
		roundLoc: roundLocGeoinfo,
		func: K.Geoapi.nearAPI
	},
	com: {
		name: 'municipality',
		cache: true,
		roundLoc: roundLocGeoinfo,
		func: K.Geoapi.municipalityAPI
	},
	prov: {
		name: 'province',
		cache: true,
		roundLoc: roundLocGeoinfo,
		func: K.Geoapi.provinceAPI
	},
	reg: {
		name: 'region',
		cache: true,
		roundLoc: roundLocGeoinfo,
		func: K.Geoapi.regionAPI
	},
	naz: {
		name: 'country',
		cache: true,
		roundLoc: roundLocGeoinfo,
		func: K.Geoapi.countryAPI
	},
	loc: {
		name: 'loc',
		cache: false,
		roundLoc: roundLocGeoinfo,
		func: function(loc) {
			return loc;
		}
	}
};

Kepler.Geoinfo = {
	getFieldsByLoc: function(loc, fields) {

		var future = new Future();

		var tasks = {};

		_.each(geoFields, function(opt, field) {
			tasks[field] = function(cb) {
				Meteor.defer(function() {
					
					var ll = K.Util.geo.roundLoc(loc, opt.roundLoc);
				 	
				 	if(cacheGeoinfo && opt.cache)
				 		cb(null, K.Cache.get(ll, opt.name, opt.func) );
				 	else
				 		cb(null, opt.func(ll) );
				});
			};
		});

		async.parallel(tasks, function(err, ret) {
			if(err)
				future.throw(err);
			else
				future.return(ret);
		});

		return future.wait();
	}
};
