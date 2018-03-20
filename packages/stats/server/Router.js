
var urls = {
		places: '/stats/places',
		placesCount: '/stats/places/count',
		users: '/stats/users',
		usersCount: '/stats/users/count'		
	},
	opts = { 
		where: 'server',
		notFoundTemplate: 'empty'
	};

function writeOut(req, res, out) {
	
	if(out) {
		res.writeHead(200, {
			'Content-type': 'application/json'
		});
	} else {
		res.writeHead(400, {
			'Content-type': 'application/json'
		});
		out = {'error': 'Bad Request'};
	}

	var ret = JSON.stringify(out);

	if(req.query && req.query['jsonp'])
		ret = req.query['jsonp']+'('+ret+');';

	res.end( ret );
}

Router.route(urls.places, opts)
.get(function (req, res) {

	var out = K.Cache.get('places','stats', K.Stats.findPlaces, 'hourly');

	writeOut(req, res, out);
});

Router.route(urls.placesCount, opts)
.get(function (req, res) {

	var out = K.Cache.get('placesCount','stats', K.Stats.findPlacesCountByDate, 'hourly');

	writeOut(req, res, out);
});

Router.route(urls.users, opts)
.get(function (req, res) {

	var out = K.Cache.get('users','stats', K.Stats.findUsers, 'hourly');

	writeOut(req, res, out);
});

Router.route(urls.usersCount, opts)
.get(function (req, res) {

	var out = K.Cache.get('usersCount','stats', K.Stats.findUsersCountByDate, 'hourly');
	//var out = K.Stats.findUsersCountByDate()
	writeOut(req, res, out);
});