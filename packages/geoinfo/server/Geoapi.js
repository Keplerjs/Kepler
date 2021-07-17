/*
	server module for compute geospatial data by 3rd party services
*/
var httpGet = function(url) {

	var res,
		getOpts = {
			timeout: 20000,	//timeout connessioni http remote
			headers: K.settings.geoinfo.headers
		};

	try {
		//TODO memoization
		res = HTTP.get(url, getOpts);

		if(res && res.data)
			return res.data;
		else
			return undefined;

	} catch(e) {
		console.log('Geoinfo: Geoapi error', e.code, url);
		return undefined;
	}
}

var sanitizeText = function(text) {
	if(_.isString(text) && text!=='')
		return K.Util.sanitize.name(text).toLowerCase();
	else
		return undefined;
};

Kepler.Geoapi = {
	/**
	 * return the geo aspect the compass direction that a slope faces(free service but only for Italy)
	 * @param  {Array} loc location [lat,lng]
	 * @return {Number}    integer number
	 */
	aspect: function(ll) {

		var data, ret, src = {
				par: 'val',
				url: 'https://opengeo.tech/maps/geotiff-picker/aspect.php?lat='+ll[0]+'&lng='+ll[1]
			};

		data = httpGet(src.url);

		if(data && data[src.par])
			ret = parseInt(data[src.par]);
		else
			ret = undefined;

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
				url: 'https://opengeo.tech/maps/geotiff-picker/dem.php?lat='+ll[0]+'&lng='+ll[1]
			};

		data = httpGet(src.url);
		
		if(data && data[src.par])
			ret = parseInt(data[src.par]);
		else
			ret = undefined;

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
			ret = undefined;

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
			ret = data.geonames[0][src.par];
		else
			ret = undefined;

		return sanitizeText(ret);
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
			ret = data[src.par];
		else
			ret = undefined;

		return sanitizeText(ret);
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
			ret = data[src.par];
		else
			ret = undefined;

		return sanitizeText(ret);
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
			ret = data[src.par];
		else
			ret = undefined;

		return sanitizeText(ret);
	},
	/**
	 * return country from geonames
	 * @param  {Array} loc [description]
	 * @return {String}    [description]
	 */			
	country: function(ll) {

		var data, ret, src = {
				par: 'countryName',
				url: 'http://api.geonames.org/countrySubdivisionJSON?level=3&'+
					 'lang=EN&'+
					 'lat='+ll[0]+'&lng='+ll[1]+'&username='+K.settings.geoinfo.geonamesUser
			};
			
		data = httpGet(src.url);

		if(data && data[src.par])
			ret = data[src.par];
		else
			ret = undefined;

		return sanitizeText(ret);
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
			ret = undefined;

		return ret;
	},
	/**
	 * return reverse geocoding of a location from nominatim OSM
	 * @param  {Array} location [description]
	 * @return {Array}    [description]
	 */
	reversegeo: function(ll) {
		
		var data, ret, src = {
				par: 'address',
				url: 'http://nominatim.openstreetmap.org/reverse?format=json'+
					 //'&osm_type=N'+
					 '&lat='+ll[0]+'&lon='+ll[1]
			};
			
		data = httpGet(src.url);

		if(data && data[src.par]) {

			ret = _.omit(data[src.par],
				'road',
				'state',
				'postcode',
				'country',
				'country_code');

			ret = _.values(ret);

			ret = _.map(ret, K.Util.sanitize.name);
		}
		else
			ret = undefined;

		return ret;
	},
	/**
	 * return location from ip address
	 * @param  {String} ip [description]
	 * @return {Array}    location
	 */		
	geoip: function(ip) {
		
		if(!K.settings.geoinfo.ipinfodbKey) {
			console.warn('Geoinfo: K.settings.geoinfo.ipinfodbKey is required');
			return undefined;
		}
		var data, ret, src = {
				par: '',
				url: 'http://api.ipinfodb.com/v3/ip-city/?key='+K.settings.geoinfo.ipinfodbKey+
						'&format=json&ip='+ip
			};

		data = httpGet(src.url);
		
		if(data && data.latitude && data.longitude) {
			ret = data;
		}
		else
			ret = undefined;

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
