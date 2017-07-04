/*
	modulo server per calcolo informazioni geografiche

	http://www.geonames.org/export/web-services.html
*/
var geonamesUser = Meteor.settings.accounts.geonamesUser,
	urls = {
		aspect: "http://localhost/maps/dem/aspect.php",
		elevation: "http://localhost/maps/dem/elevation.php"
	},
	getOpts = {
		timeout: 20000,	//timeout connessioni http remote
		httpHeaders: {
			//'Referer': Meteor.settings.website.domain
			'User-Agent': ''
		}
	};

Kepler.geoinfo = (function() {

	function aspectAPILocal(ll) {

		var res, ret, src = {
				par: 'aspect',
				url: urls.aspect+'?lat='+ll[0]+'&lng='+ll[1]
			};

		try {
			res = HTTP.get(src.url, getOpts);
		} catch(e) {
			console.log('aspectAPILocal: error');
			return null;
		}

		if(res.statusCode == 200 && res.data && res.data[src.par])
			ret = K.Util.sanitizeName(res.data[src.par]);
		else
			ret = null;

		console.log("aspectAPILocal()",ll,ret);
		return ret;
	}

	function elevationAPILocal(ll) {

		var res, ret, src = {
				par: 'ele',
				url: urls.elevation+'?lat='+ll[0]+'&lng='+ll[1]
			};

		try {
			res = HTTP.get(src.url, getOpts);
		} catch(e) {
			console.log('elevationAPILocal: error');
			return null;
		}
		
		if(res.statusCode == 200 && res.data && res.data[src.par])
			ret = K.Util.sanitizeName(res.data[src.par]);
		else
			ret = null;

		console.log("elevationAPILocal()",ll,ret);
		return ret;
	}

	function elevationAPIGeonames(ll) {

		var res, ret, srcSRTM = {
				par: 'srtm3',
				url: 'http://api.geonames.org/srtm3JSON?'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+geonamesUser,
			},
			srcASTER = {
				par: 'astergdem',
				url: 'http://api.geonames.org/astergdemJSON?'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+geonamesUser,
			};

		try {
			res = HTTP.get(src.url, getOpts);
		} catch(e) {
			console.log('elevationAPIGeonames: error');
			return null;
		}
		
		if(res.statusCode == 200 && res.data && res.data.geonames && res.data.geonames[0] && res.data.geonames[0][srcASTER.par])
			ret = K.Util.sanitizeName(res.data.geonames[0][srcASTER.par]);
		else
			ret = null;

		console.log("elevationAPIGeonames() ",ll,ret);
		return ret;
	}

	function nearAPI(ll) {

		var res, ret, src = {
				par: 'name',
				url: 'http://api.geonames.org/findNearbyJSON?lang=IT&style=SHORT&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+geonamesUser
			};
		
		try {
			res = HTTP.get(src.url, getOpts);
		} catch(e) {
			console.log('nearAPI: error');
			return null;
		}

		if(res.statusCode == 200 && res.data && res.data.geonames && res.data.geonames[0] && res.data.geonames[0][src.par])
			ret = K.Util.sanitizeName(res.data.geonames[0][src.par]);
		else
			ret = null;

		console.log("nearAPI() ",ll,ret);
		return ret;
	}

	function municipalityAPI(ll) {

		var res, ret, src = {
				par: 'adminName3',
				url: 'http://api.geonames.org/countrySubdivisionJSON?lang=IT&level=3&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+geonamesUser
			};

		try {
			res = HTTP.get(src.url, getOpts);
		} catch(e) {
			console.log('municipalityAPI: error');
			return null;
		}
		
		if(res.statusCode == 200 && res.data && res.data[src.par])
			ret = K.Util.sanitizeName(res.data[src.par]);
		else
			ret = null;

		console.log("municipalityAPI() ",ll,ret);
		return ret;
	}

	function provinceAPI(ll) {

		var res, ret, src = {
				par: 'adminName2',
				url: 'http://api.geonames.org/countrySubdivisionJSON?lang=IT&level=3&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+geonamesUser
			};

		try {
			res = HTTP.get(src.url, getOpts);
		} catch(e) {
			console.log('provinceAPI: error');
			return null;
		}

		if(res.statusCode == 200 && res.data && res.data[src.par])
			ret = K.Util.sanitizeName(res.data[src.par]);
		else
			ret = null;

		console.log("provinceAPI() ",ll,ret);
		return ret;
	}

	function regionAPI(ll) {

		var res, ret, src = {
				par: 'adminName1',
				url: 'http://api.geonames.org/countrySubdivisionJSON?lang=IT&level=3&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+geonamesUser
			};

		try {
			res = HTTP.get(src.url, getOpts);
		} catch(e) {
			console.log('regionAPI: error');
			return null;
		}
		
		if(res.statusCode == 200 && res.data && res.data[src.par])
			ret = K.Util.sanitizeName(res.data[src.par]);
		else
			ret = null;

		console.log("regionAPI() ",ll,ret);
		return ret;
	}

	function countryAPI(ll) {

		var res, ret, src = {
				par: 'countryName',
				url: 'http://api.geonames.org/countrySubdivisionJSON?lang=IT&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+geonamesUser
			};

		try {
			res = HTTP.get(src.url, getOpts);
		} catch(e) {
			console.log('countryAPI: error');
			return null;
		}
		
		if(res.statusCode == 200 && res.data && res.data.geonames && res.data.geonames[0] && res.data.geonames[0][src.par])
			ret = K.Util.sanitizeName(res.data.geonames[0][src.par]);
		else
			ret = null;

		console.log("countryAPI() ",ll,ret);
		return ret;
	}

	function geoipAPI(ip) {
		//API: http://ipinfodb.com/ip_location_api.php
		/*{
			"statusCode" : "OK", "statusMessage" : "",
			"ipAddress" : "62.56.230.41",
			"countryCode" : "GB", "countryName" : "UNITED KINGDOM",
			"regionName" : "-", "cityName" : "-", "zipCode" : "-",
			"latitude" : "51.5085", "longitude" : "-0.12574",
			"timeZone" : "+00:00"
		}*/
		var ipinfodbKey = Meteor.settings.accounts.ipinfodbKey,
			res, ret, src = {
				url: 'http://api.ipinfodb.com/v3/ip-city/?key='+ipinfodbKey+
						'&format=json&ip='+ip
			};

		try {
			res = HTTP.get(src.url, getOpts);
		} catch(e) {
			console.log('geoipAPI: error');
			return null;
		}
		
		if(res.statusCode == 200 && res.data)
			ret = res.data;

		ret.loc = [parseFloat(ret.latitude), parseFloat(ret.longitude)];

		return ret;
	}

	return {
		elevation: function(ll) {

			ll = K.Util.geo.roundLoc(ll, 8);

			return K.Cache.get(ll, 'elevation', elevationAPILocal);
		},
		aspect: function(ll) {
			
			ll = K.Util.geo.roundLoc(ll, 8);

			return K.Cache.get(ll, 'aspect', aspectAPILocal);
		},
		near: function(ll) {

			ll = K.Util.geo.roundLoc(ll, 4);

			return K.Cache.get(ll, 'near', nearAPI);
		},
		municipality: function(ll) {

			ll = K.Util.geo.roundLoc(ll, 6);

			return K.Cache.get(ll ,'municipality', municipalityAPI);
		},
		province: function(ll) {

			ll = K.Util.geo.roundLoc(ll, 6);

			return K.Cache.get(ll ,'province', provinceAPI);
		},
		region: function(ll) {

			ll = K.Util.geo.roundLoc(ll, 2);

			return K.Cache.get(ll ,'region', regionAPI);
		},
		country: function(ll) {

			ll = K.Util.geo.roundLoc(ll, 1);

			return K.Cache.get(ll ,'country', countryAPI);
		},
		geoip:  function(ip) {
			return K.Cache.get(ip, 'geoip', geoipAPI);
		}		
	};
}());
