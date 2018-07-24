
var urls = {
		places: '/stats/places',
		placesByDate: '/stats/places/bydate',
		placesActivities: '/stats/places/activities/bydate',
		users: '/stats/users',
		usersByDate: '/stats/users/bydate',
	},
	opts = { 
		where: 'server',
		notFoundTemplate: 'empty'
	};

function writeOut(req, res, out) {
	
	var headers = _.defaults(K.settings.stats.apiHeaders, {
		'Content-type': 'application/json'
	});

	if(out) {
		res.writeHead(200, headers);
	} else {
		res.writeHead(400, headers);
		out = {'error': 'Bad Request'};
	}

	var ret = JSON.stringify(out);

	if(req.query && req.query['jsonp'])
		ret = req.query['jsonp']+'('+ret+');';

	res.end( ret );
}

///////////DEBUG
K.Cache.clean('stats');

Router.route(urls.places, opts)
.get(function (req, res) {

	var out = K.Cache.get('places','stats', K.Stats.findPlaces, K.settings.stats.cacheTime);

	writeOut(req, res, out);
});

Router.route(urls.placesByDate, opts)
.get(function (req, res) {

	var out = K.Cache.get('placesByDate','stats', K.Stats.findPlacesByDate, K.settings.stats.cacheTime);

	writeOut(req, res, out);
});

Router.route(urls.users, opts)
.get(function (req, res) {

	var out = K.Cache.get('users','stats', K.Stats.findUsers, K.settings.stats.cacheTime);

	writeOut(req, res, out);
});

Router.route(urls.usersByDate, opts)
.get(function (req, res) {

	var out = K.Cache.get('usersByDate','stats', K.Stats.findUsersByDate, K.settings.stats.cacheTime);
	
	writeOut(req, res, out);
});

Router.route(urls.placesActivities, opts)
.get(function (req, res) {

	var out = K.Cache.get('placesActivitiesByDate','stats', K.Stats.findPlacesActivitiesByDate, K.settings.stats.cacheTime);

	writeOut(req, res, out);
});