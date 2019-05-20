
var opts = { 
		where: 'server',
		notFoundTemplate: 'empty'
	};

var baseUrl = K.settings.public.api.baseUrl+'/stats',
	urls = {
		root: baseUrl,
		placesByGeo: baseUrl+'/places/bygeo',//TODO bbox param
		placesByDate: baseUrl+'/places/bydate',
		usersByGeo: baseUrl+'/users/bygeo',
		usersByDate: baseUrl+'/users/bydate',
		conversByDate: baseUrl+'/convers/bydate',
		placesByField: baseUrl+'/places/byfield/:field',
		usersByField: baseUrl+'/users/byfield/:field',
	};

_.extend(K.Api.urls, {
	stats: urls
});

///////////DEBUG
//K.Cache.clean('stats');
Router.route(baseUrl, opts).get(function (req, res) {

	var out = urls;

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placesByGeo, opts).get(function (req, res) {

	//TODO var bbox = this.params.bbox || '';
	////TODO roundBBox!!

	var out = K.Cache.get('placesByGeo','stats', K.findStatsPlacesByGeo, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placesByDate, opts).get(function (req, res) {

	var out = K.Cache.get('placesByDate','stats', K.findStatsPlacesByDate, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});

Router.route(urls.usersByGeo, opts).get(function (req, res) {

	var out = K.Cache.get('usersByGeo','stats', K.findStatsUsersByGeo, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});

Router.route(urls.usersByDate, opts).get(function (req, res) {

	var out = K.Cache.get('usersByDate','stats', K.findStatsUsersByDate, K.settings.stats.cacheTime);
	
	K.Api.writeOut(req, res, out);
});

Router.route(urls.conversByDate, opts).get(function (req, res) {

	var out = K.Cache.get('conversByDate','stats', K.findStatsConversByDate, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});


Router.route(urls.placesByField, opts).get(function (req, res) {

	var field = this.params.field || '';

	var	out = K.Cache.get('placesByField_'+field, 'stats', function() {
			return K.findStatsPlacesByField(field);
		}, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});

Router.route(urls.usersByField, opts).get(function (req, res) {

	var field = this.params.field || '';

	var	out = K.Cache.get('usersByField_'+field, 'stats', function() {
			return K.findStatsUsersByField(field);
		}, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});

