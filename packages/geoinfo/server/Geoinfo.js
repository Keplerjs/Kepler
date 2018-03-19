
var Future = Npm.require('fibers/future');

//TODO move to settings
var roundLocGeoinfo = 4;

Kepler.Geoinfo = {
	fields: {
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
			func: K.Geoapi.aspect
		},
		near: {
			name: 'near',
			caching: true,
			roundLoc: 4,
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
	},	
	getFieldsByLoc: function(loc, fields) {

		var fields = fields || K.settings.public.geoinfo.fields,
			tasks = {};

		_.each(this.fields, function(opt, field) {
			if(fields[field]) {
				tasks[field] = function(cb) {
					Meteor.defer(function() {
						
						var rloc = K.Util.geo.roundLoc(loc, opt.roundLoc);
					 	
					 	if(K.settings.geoinfo.caching && opt.caching)
					 		cb(null, K.Cache.get(rloc, opt.name, opt.func) );
					 	else
					 		cb(null, opt.func(rloc) );
					});
				};
			}
		});

		var future = new Future();

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

Meteor.methods({
	findGeoinfoByLoc: function(loc, fields) {

		if(!this.userId || !K.Util.valid.loc(loc)) return null;

		console.log('Geoinfo: findGeoinfoByLoc...', loc, fields);

		return K.Geoinfo.getFieldsByLoc(loc, fields);
	},
	findGeocoding: function(text) {

		if(!this.userId) return null;

		var ret = K.Geoinfo.getGeocoding(text);

		console.log('Geoinfo: findGeocoding', text, ret);

		return ret;
	}
});