
var baseUrl = K.settings.api.baseUrl+'/stats',
	opts = { 
		where: 'server',
		notFoundTemplate: 'empty'
	};

var urls = {
	root: baseUrl,
	placesByGeo: baseUrl+'/places/bygeo',
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
Router.route(urls.root, opts)
.get(function (req, res) {

	var out = urls;

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placesByGeo, opts)
.get(function (req, res) {

	var out = K.Cache.get('placesByGeo','stats', K.Stats.findPlaces, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placesByDate, opts)
.get(function (req, res) {

	var out = K.Cache.get('placesByDate','stats', K.Stats.findPlacesByDate, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});

Router.route(urls.usersByGeo, opts)
.get(function (req, res) {

	var out = K.Cache.get('usersByGeo','stats', K.Stats.findUsers, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});

Router.route(urls.usersByDate, opts)
.get(function (req, res) {

	var out = K.Cache.get('usersByDate','stats', K.Stats.findUsersByDate, K.settings.stats.cacheTime);
	
	K.Api.writeOut(req, res, out);
});

Router.route(urls.conversByDate, opts)
.get(function (req, res) {

	var out = K.Cache.get('conversByDate','stats', K.Stats.findConversByDate, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});


Router.route(urls.placesByField, opts)
.get(function (req, res) {

	var field = this.params.field || '';

	var	out = K.Cache.get('placesByField_'+field, 'stats', function() {
			return K.Stats.findPlacesByField(field);
		}, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});

Router.route(urls.usersByField, opts)
.get(function (req, res) {

	var field = this.params.field || '';

	var	out = K.Cache.get('usersByField_'+field, 'stats', function() {
			return K.Stats.findUsersByField(field);
		}, K.settings.stats.cacheTime);

	K.Api.writeOut(req, res, out);
});

