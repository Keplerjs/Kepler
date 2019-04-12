
var baseUrl = K.settings.public.api.baseUrl+'/stats',
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

function writeOut(req, res, out, jsonOpts) {

	//jsonOpts = jsonOpts || [];
	
	var headers = _.defaults(K.settings.stats.apiHeaders, {
		'Content-type': 'application/json'
	});

	if(out) {
		res.writeHead(200, headers);
	} else {
		res.writeHead(400, headers);
		out = {'error': 'Bad Request'};
	}

	var ret = JSON.stringify.apply(this, _.union(out, jsonOpts));

	if(req.query && req.query['jsonp'])
		ret = req.query['jsonp']+'('+ret+');';

	res.end( ret );
}

///////////DEBUG
//K.Cache.clean('stats');
Router.route(urls.root, opts)
.get(function (req, res) {

	var out = urls;

	writeOut(req, res, out, [null, 4, ' ']);
});

Router.route(urls.placesByGeo, opts)
.get(function (req, res) {

	var out = K.Cache.get('placesByGeo','stats', K.Stats.findPlaces, K.settings.stats.cacheTime);

	writeOut(req, res, out);
});

Router.route(urls.placesByDate, opts)
.get(function (req, res) {

	var out = K.Cache.get('placesByDate','stats', K.Stats.findPlacesByDate, K.settings.stats.cacheTime);

	writeOut(req, res, out);
});

Router.route(urls.usersByGeo, opts)
.get(function (req, res) {

	var out = K.Cache.get('usersByGeo','stats', K.Stats.findUsers, K.settings.stats.cacheTime);

	writeOut(req, res, out);
});

Router.route(urls.usersByDate, opts)
.get(function (req, res) {

	var out = K.Cache.get('usersByDate','stats', K.Stats.findUsersByDate, K.settings.stats.cacheTime);
	
	writeOut(req, res, out);
});

Router.route(urls.conversByDate, opts)
.get(function (req, res) {

	var out = K.Cache.get('conversByDate','stats', K.Stats.findConversByDate, K.settings.stats.cacheTime);

	writeOut(req, res, out);
});


Router.route(urls.placesByField, opts)
.get(function (req, res) {

	var field = this.params.field || '';

	var	out = K.Cache.get('placesByField_'+field, 'stats', function() {
			return K.Stats.findPlacesByField(field);
		}, K.settings.stats.cacheTime);

	writeOut(req, res, out);
});

Router.route(urls.usersByField, opts)
.get(function (req, res) {

	var field = this.params.field || '';

	var	out = K.Cache.get('usersByField_'+field, 'stats', function() {
			return K.Stats.findUsersByField(field);
		}, K.settings.stats.cacheTime);

	writeOut(req, res, out);
});

