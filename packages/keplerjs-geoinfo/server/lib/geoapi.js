
var geonamesUser = Meteor.settings.accounts.geonamesUser,
	ipinfodbKey = Meteor.settings.accounts.ipinfodbKey,
	getOpts = {
		timeout: 20000,	//timeout connessioni http remote
		httpHeaders: {
			'User-Agent': ''
		}
	};

function aspectAPILocal(ll) {

	var res, ret, src = {
			par: 'aspect',
			url: 'http://localhost/maps/dem/aspect.php?lat='+ll[0]+'&lng='+ll[1]
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

	return ret;
}

function elevationAPILocal(ll) {

	var res, ret, src = {
			par: 'ele',
			url: 'http://localhost/maps/dem/elevation.php?lat='+ll[0]+'&lng='+ll[1]
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
	var res, ret, src = {
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

	return K.Util.geo.roundLoc([ret.latitude, ret.longitude]);
}
