
var Future = Npm.require('fibers/future');

//TODO move to settings
Kepler.Geoinfo = {
	fields: {
		ele: {
			name: 'elevation',
			func: K.Geoapi.elevation,
			locRound: 8,
		},
		esp: {
			name: 'aspect',
			func: K.Geoapi.aspect,
			locRound: 8,
		},
		near: {
			name: 'near',
			func: K.Geoapi.near
		},
		com: {
			name: 'municipality',
			func: K.Geoapi.municipality
		},
		prov: {
			name: 'province',
			func: K.Geoapi.province
		},
		reg: {
			name: 'region',
			func: K.Geoapi.region
		},
		naz: {
			name: 'country',
			func: K.Geoapi.country
		},
		//TODO refact
		loc: {
			name: 'loc',
			cacheTime: 'none',
			locRound: 8,
			func: function(loc) {return loc}
		}
	},	
	getFieldsByLoc: function(loc, fields, callback) {

		callback = _.isFunction(fields) ? fields : callback;

		fields = !_.isFunction(fields) && fields || K.settings.public.geoinfo.fields;

		var tasks = {};

		_.each(this.fields, function(opt, field) {
			if(fields[field]) {
				tasks[field] = function(cb) {
					Meteor.defer(function() {
						
						var rloc = K.Util.geo.locRound(loc, opt.locRound || K.settings.geoinfo.locRound),
							cacheTime = opt.cacheTime || K.settings.geoinfo.cacheTime;
					 	
					 	var data = K.Cache.get(rloc, opt.name, function(o) {
								return opt.func(rloc);
							}, cacheTime);

						cb(null, data);
					});
				};
			}
		});

		if(_.isFunction(callback)) {
			async.parallel(tasks, function(err, ret) {

				if(err)
					console.log('Geoinfo: getFieldsByLoc error ', err);
				else {
					callback(ret);
				}
			});
		}
		else
		{
			var future = new Future();

			async.parallel(tasks, function(err, ret) {

				if(err)
					future.throw(err);
				else
					future.return(ret);
			});

			return future.wait();
		}
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
				loc: K.Util.geo.locRound([r.lat, r.lon])
			};
		});

		return ret;
	},
	getTrackInfo: function(track) {

		if( track && track.type==="Feature" && 
			track.geometry.type==="LineString" ) {
			
			var prop = track.properties || {},
				geom = track.geometry,// K.Util.geo.linestringClean(track.geometry),
				p1 = _.first(geom.coordinates),
				p2 = _.last(geom.coordinates);

			var loc1 = [p1[1],p1[0]],
				loc2 = [p2[1],p2[0]],
				geo1 = K.Geoinfo.getFieldsByLoc(loc1, {ele: 1 }),
				geo2 = K.Geoinfo.getFieldsByLoc(loc2, {ele: 1 }),
				dis = Math.abs(parseInt(geo2.ele) - parseInt(geo1.ele));
	
		//TODO add in sub property 'geoinfo'
			prop.start= K.Util.geo.point(loc1);
			prop.end  = K.Util.geo.point(loc2);
			prop.dis  = parseInt( dis );
			prop.len  = prop.len || parseInt( Math.round( K.Util.geo.linestringLen(geom) ) );
			prop.time = prop.time || parseInt( K.Util.geo.linestringTime(prop.len, prop.dis) );
		}

		return prop;
	},
	getIpInfo: function(ip) {

		var ret = K.Cache.get(ip, 'geoip', K.Geoapi.geoip, K.settings.geoinfo.cacheTime);

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

		console.log('Geoinfo: findGeocoding', text);

		return ret;
	},
	findReverseGeo: function(loc) {

		if(!this.userId || !K.Util.valid.loc(loc)) return null;

		var ret = [],
			rloc = K.Util.geo.locRound(loc, 6);

		var ret = K.Cache.get(rloc, 'reversegeo', K.Geoapi.reversegeo, K.settings.geoinfo.cacheTime);

		console.log('Geoinfo: findReverseGeo', loc);

		return ret;
	}
});