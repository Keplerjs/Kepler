//TODO import file by POST api
/*
var opts = { 
		where: 'server',
		notFoundTemplate: 'empty'
	};

var baseUrl = K.settings.public.api.baseUrl+'/import',
	urls = {
		root: baseUrl,
		geojson: baseUrl+'/geojson'
	};

_.extend(K.Api.urls, {
	import: urls
});

Router.route(baseUrl, opts).get(function (req, res) {

	var out = urls;

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placesByGeo, opts).get(function (req, res) {

	var out = K.Cache.get('placesByGeo','stats', K.findStatsPlacesByGeo, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});
*/