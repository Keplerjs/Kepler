/*
	server module for compute geospatial data by 3rd party services
*/

var httpGet = function(url) {

	var getOpts = {
			timeout: 20000,	//timeout connessioni http remote
			httpHeaders: {
				'User-Agent': ''
			}
		};

	try {
		
		var res = HTTP.get(url, getOpts);

console.log(url,'DATA:',res.data)

		if(res && res.data)
			return res.data;
		else
			return null;

	} catch(e) {
		console.log('Geoinfo: error', e.statusCode || (e.response && e.response.statusCode), url);
		return null;
	}
}

Kepler.Geoapi = {	

	aspectAPILocal: function(ll) {

		var data, ret, src = {
				par: 'aspect',
				url: 'http://localhost/maps/dem/aspect.php?lat='+ll[0]+'&lng='+ll[1]
			};

		data = httpGet(src.url);

		if(data && data[src.par])
			ret = K.Util.sanitizeName(data[src.par]);
		else
			ret = null;

		return ret;
	},
	elevationAPILocal: function(ll) {

		var data, ret, src = {
				par: 'ele',
				url: 'http://localhost/maps/dem/elevation.php?lat='+ll[0]+'&lng='+ll[1]
			};

		data = httpGet(src.url);
		
		if(data && data[src.par])
			ret = K.Util.sanitizeName(data[src.par]);
		else
			ret = null;

		return ret;
	},
	elevationAPI: function(ll) {

		var res, ret, 
			src = {
				par: 'srtm1',
				url: 'http://api.geonames.org/srtm1JSON?'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser,
			};

		data = httpGet(src.url);
		
		if(data && data[src.par])
			ret = parseInt(data[src.par]);
		else
			ret = null;

		return ret;
	},
	nearAPI: function(ll) {

		var data, ret, src = {
				par: 'name',
				url: 'http://api.geonames.org/findNearbyJSON?lang=IT&style=SHORT&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};

		data = httpGet(src.url);

		if(data && data.geonames && data.geonames[0] && data.geonames[0][src.par])
			ret = K.Util.sanitizeName(data.geonames[0][src.par]);
		else
			ret = null;

		return ret;
	},
	municipalityAPI: function(ll) {

		var data, ret, src = {
				par: 'adminName3',
				url: 'http://api.geonames.org/countrySubdivisionJSON?lang=IT&level=3&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};

		data = httpGet(src.url);
		
		if(data && data[src.par])
			ret = K.Util.sanitizeName(data[src.par]);
		else
			ret = null;

		return ret;
	},
	provinceAPI: function(ll) {

		var data, ret, src = {
				par: 'adminName2',
				url: 'http://api.geonames.org/countrySubdivisionJSON?lang=IT&level=3&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};

		data = httpGet(src.url);

		if(data && data[src.par])
			ret = K.Util.sanitizeName(data[src.par]);
		else
			ret = null;

		return ret;
	},
	regionAPI: function(ll) {

		var data, ret, src = {
				par: 'adminName1',
				url: 'http://api.geonames.org/countrySubdivisionJSON?lang=IT&level=3&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};

		data = httpGet(src.url);
		
		if(data && data[src.par])
			ret = K.Util.sanitizeName(data[src.par]);
		else
			ret = null;

		return ret;
	},
	countryAPI: function(ll) {

		var data, ret, src = {
				par: 'countryName',
				url: 'http://api.geonames.org/countrySubdivisionJSON?lang=IT&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};
			
		data = httpGet(src.url);

		if(data && data[src.par])
			ret = K.Util.sanitizeName(data[src.par]);
		else
			ret = null;

		return ret;
	},
	geoipAPI: function(ip) {
		
		var data, ret, src = {
				par: '',
				url: 'http://api.ipinfodb.com/v3/ip-city/?key='+K.settings.geoinfo.ipinfodbKey+
						'&format=json&ip='+ip
			};

		data = httpGet(src.url);
		
		if(data && data.latitude && data.longitude) {
			ret = K.Util.geo.roundLoc([data.latitude, data.longitude]);
		}
		else
			ret = null;

		return ret;
		//API: http://ipinfodb.com/ip_location_api.php
		/*{
			"statusCode" : "OK", "statusMessage" : "",
			"ipAddress" : "62.56.230.41",
			"countryCode" : "GB", "countryName" : "UNITED KINGDOM",
			"regionName" : "-", "cityName" : "-", "zipCode" : "-",
			"latitude" : "51.5085", "longitude" : "-0.12574",
			"timeZone" : "+00:00"
		}*/		
	}
	//TODO timezone used within SunCalc
	//http://www.geonames.org/export/web-services.html
/*
	Webservice Type : REST 
	Url : api.geonames.org/timezone?
	Parameters : lat,lng, radius (buffer in km for closest timezone in coastal areas),lang (for countryName), date (date for sunrise/sunset);
	Result : the timezone at the lat/lng with gmt offset (1. January) and dst offset (1. July) 
	Example http://api.geonames.org/timezone?lat=47.01&lng=10.2&username=demo */
};