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
	/**
	 * return the geo aspect the compass direction that a slope faces(free service but only for Italy)
	 * @param  {Array} loc location [lat,lng]
	 * @return {Number}    integer number
	 */
	aspect: function(ll) {

		var data, ret, src = {
				par: 'val',
				url: 'http://labs.easyblog.it/maps/geotiff-picker/aspect?lat='+ll[0]+'&lng='+ll[1]
			};

		data = httpGet(src.url);

		if(data && data[src.par])
			ret = parseInt(data[src.par]);
		else
			ret = null;

		return ret;
	},
	/**
	 * return elevation from SRTM1 30m precision, high precision (free service but only for Italy)
	 * @param  {Array} loc location [lat,lng]
	 * @return {Number}    integer number
	 */	
	elevationItaly: function(ll) {

		var data, ret, src = {
				par: 'val',
				url: 'http://labs.easyblog.it/maps/geotiff-picker/dem?lat='+ll[0]+'&lng='+ll[1]
			};

		data = httpGet(src.url);
		
		if(data && data[src.par])
			ret = parseInt(data[src.par]);
		else
			ret = null;

		return ret;
	},
	/**
	 * return elevation from SRTM1 30m precision
	 * @param  {Array} loc location [lat,lng]
	 * @return {Number}    integer number
	 */	
	elevation: function(ll) {

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
	/**
	 * return locality nearby from geonames
	 * @param  {Array} loc [description]
	 * @return {String}    [description]
	 */
	near: function(ll) {

		var data, ret, src = {
				par: 'name',
				url: 'http://api.geonames.org/findNearbyJSON?'+
					 'lang=EN&'+
					 'style=SHORT&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};

		data = httpGet(src.url);

		if(data && data.geonames && data.geonames[0] && data.geonames[0][src.par])
			ret = K.Util.sanitize.name(data.geonames[0][src.par]);
		else
			ret = null;

		return ret;
	},
	/**
	 * return municipality from geonames
	 * @param  {Array} loc [description]
	 * @return {String}    [description]
	 */	
	municipality: function(ll) {

		var data, ret, src = {
				par: 'adminName3',
				url: 'http://api.geonames.org/countrySubdivisionJSON?level=3&'+
					 'lang=EN&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};

		data = httpGet(src.url);
		
		if(data && data[src.par])
			ret = K.Util.sanitize.name(data[src.par]);
		else
			ret = null;

		return ret;
	},
	/**
	 * return province from geonames
	 * @param  {Array} loc [description]
	 * @return {String}    [description]
	 */		
	province: function(ll) {

		var data, ret, src = {
				par: 'adminName2',
				url: 'http://api.geonames.org/countrySubdivisionJSON?level=3&'+
					 'lang=EN&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};

		data = httpGet(src.url);

		if(data && data[src.par])
			ret = K.Util.sanitize.name(data[src.par]);
		else
			ret = null;

		return ret;
	},
	/**
	 * return region from geonames
	 * @param  {Array} loc [description]
	 * @return {String}    [description]
	 */			
	region: function(ll) {

		var data, ret, src = {
				par: 'adminName1',
				url: 'http://api.geonames.org/countrySubdivisionJSON?level=3&'+
					 'lang=EN&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};

		data = httpGet(src.url);
		
		if(data && data[src.par])
			ret = K.Util.sanitize.name(data[src.par]);
		else
			ret = null;

		return ret;
	},
	/**
	 * return country from geonames
	 * @param  {Array} loc [description]
	 * @return {String}    [description]
	 */			
	country: function(ll) {

		var data, ret, src = {
				par: 'countryName',
				url: 'http://api.geonames.org/countrySubdivisionJSON?'+
					 'lang=EN&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};
			
		data = httpGet(src.url);

		if(data && data[src.par])
			ret = K.Util.sanitize.name(data[src.par]);
		else
			ret = null;

		return ret;
	},
	/**
	 * return geocoding from nominatim OSM
	 * @param  {String} text [description]
	 * @return {Array}    [description]
	 */			
	geocoding: function(text) {
		
		/*url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
		jsonpParam: 'json_callback',
		propertyName: 'display_name',
		propertyLoc: ['lat','lon'],*/

		var data, ret, src = {
				par: '',
				url: 'http://nominatim.openstreetmap.org/search?format=json'+
					 '&q='+text
			};
			
		data = httpGet(src.url);

		if(data.length)
			ret = data;
		else
			ret = null;

		return ret;
	},
	/**
	 * return location from ip address
	 * @param  {String} ip [description]
	 * @return {Array}    location
	 */		
	geoip: function(ip) {
		
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
		//: http://ipinfodb.com/ip_location_api.php
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