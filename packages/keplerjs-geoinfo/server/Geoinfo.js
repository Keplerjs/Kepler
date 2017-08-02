
var Future = Npm.require('fibers/future');

//TODO move to settings
var roundLocGeoinfo = 4;

/*Meteor.startup(function() {
	_.each(geoFields, function(opt,field) {
		console.log('Geoinfo: cache clean ', opt.name);
		K.Cache.clean(opt.name);
	});
});*/

var geoFields = {
	ele: {
		name: 'elevation',
		caching: true,
		roundLoc: 8,
		func: K.Geoapi.elevation
	},
	esp: {
		name: 'aspect',
		caching: true,
		roundLoc: 8,
		func: K.Geoapi.aspectLocal
	},
	near: {
		name: 'near',
		caching: true,
		roundLoc: roundLocGeoinfo,
		func: K.Geoapi.near
	},
	com: {
		name: 'municipality',
		caching: true,
		roundLoc: roundLocGeoinfo,
		func: K.Geoapi.municipality
	},
	prov: {
		name: 'province',
		caching: true,
		roundLoc: roundLocGeoinfo,
		func: K.Geoapi.province
	},
	reg: {
		name: 'region',
		caching: true,
		roundLoc: roundLocGeoinfo,
		func: K.Geoapi.region
	},
	naz: {
		name: 'country',
		caching: true,
		roundLoc: roundLocGeoinfo,
		func: K.Geoapi.country
	},
	loc: {
		name: 'loc',
		caching: false,
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
				 	
				 	if(K.settings.geoinfo.caching && opt.caching)
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
	},
	getGeocoding: function(text) {

		var ori = [],
			ret = [];

		ori = K.Geoapi.geocoding(text);

		ret = _.filter(ori, function(r) {
			return r.osm_type === 'node'
				   && r.class === 'place';
		});
		
		ret = _.map(ret, function(r) {
			var disp = r.display_name.split(','),
				full = _.rest(disp).join(',');

			return {
				name: disp[0],
				full: full,
				loc: K.Util.geo.roundLoc([r.lat, r.lon])
			};
		});

		console.log('getGeocoding', ret, ori);

		return ret;
	}
};
