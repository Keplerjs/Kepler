/*
	modulo server per calcolo informazioni geografiche

	http://www.geonames.org/export/web-services.html
*/

var cacheGet = function(ll, key, func) {

	var loc = K.Util.geo.roundLoc(ll, 8);
	
	return K.Cache.get(loc, key, func);
}

Kepler.Geoinfo = {		
	elevation: function(ll) {
		return cacheGet(ll, 'elevation', elevationAPILocal);
	},
	aspect: function(ll) {
		return cacheGet(ll, 'aspect', aspectAPILocal);
	},
	near: function(ll) {
		return cacheGet(ll, 'near', nearAPI);
	},
	municipality: function(ll) {
		return cacheGet(ll ,'municipality', municipalityAPI);
	},
	province: function(ll) {
		return cacheGet(ll ,'province', provinceAPI);
	},
	region: function(ll) {
		return cacheGet(ll ,'region', regionAPI);
	},
	country: function(ll) {
		return cacheGet(ll ,'country', countryAPI);
	},
	geoip:  function(ip) {
		return K.Cache.get(ip, 'geoip', geoipAPI);
	}
};
