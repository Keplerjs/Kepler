/*K.Cache.clean('elevation');
K.Cache.clean('aspect');
K.Cache.clean('near');
K.Cache.clean('municipality');
K.Cache.clean('province');
K.Cache.clean('region');
K.Cache.clean('country');
K.Cache.clean('geoip');
*/
var geoFields = {
	'elevation': {
		field: 'ele',
		func: K.Geoapi.elevationAPILocal
	},
	'aspect': {
		field: 'esp',
		func: K.Geoapi.aspectAPILocal
	},
	'near': {
		field: 'near',
		func: K.Geoapi.nearAPI
	},
	'municipality': {
		field: 'com',
		func: K.Geoapi.municipalityAPI
	},
	'province': {
		field: 'prov',
		func: K.Geoapi.provinceAPI
	},
	'region': {
		field: 'reg',
		func: K.Geoapi.regionAPI
	},
	'country': {
		field: 'naz',
		func: K.Geoapi.countryAPI
	}
};

Kepler.Geoinfo = {
	elevation: function(ll) {
		ll = K.Util.geo.roundLoc(ll, 8);
		return K.Cache.get(ll, 'elevation', K.Geoapi.elevationAPILocal);
	},
	aspect: function(ll) {
		ll = K.Util.geo.roundLoc(ll, 8);
		return K.Cache.get(ll, 'aspect', K.Geoapi.aspectAPILocal);
	},
	near: function(ll) {
		ll = K.Util.geo.roundLoc(ll, 8);
		return K.Cache.get(ll, 'near', K.Geoapi.nearAPI);
	},
	municipality: function(ll) {
		ll = K.Util.geo.roundLoc(ll, 8);
		return K.Cache.get(ll ,'municipality', K.Geoapi.municipalityAPI);
	},
	province: function(ll) {
		ll = K.Util.geo.roundLoc(ll, 8);
		return K.Cache.get(ll ,'province', K.Geoapi.provinceAPI);
	},
	region: function(ll) {
		ll = K.Util.geo.roundLoc(ll, 8);
		return K.Cache.get(ll ,'region', K.Geoapi.regionAPI);
	},
	country: function(ll) {
		ll = K.Util.geo.roundLoc(ll, 8);
		return K.Cache.get(ll ,'country', K.Geoapi.countryAPI);
	},
	geoip:  function(ip) {
		return K.Cache.get(ip, 'geoip', K.Geoapi.geoipAPI);
	}
};


