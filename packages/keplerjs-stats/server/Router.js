
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

	var noClassify = req.query['noClassify'];

	var out = K.Stats.findPlaces(noClassify);

	//ll = K.Util.geo.roundLoc(ll, 2);
	//var val = K.Cache.get(ll, 'weather');
	//return val || K.Cache.set(ll, weatherAPI(ll), 'weather', 'daily');

	writeOut(req, res, out);
});

Router.route(urls.placesCount, opts)
.get(function (req, res) {

	var noClassify = req.query['noClassify'];

	var out = K.Stats.findPlacesCountByDate();
	
	//ll = K.Util.geo.roundLoc(ll, 2);
	//var val = K.Cache.get(ll, 'weather');
	//return val || K.Cache.set(ll, weatherAPI(ll), 'weather', 'daily');

	writeOut(req, res, out);
});


Router.route(urls.users, opts)
.get(function (req, res) {

	var noClassify = req.query['noClassify'];

	var out = K.Stats.findUsers(noClassify);

	//ll = K.Util.geo.roundLoc(ll, 2);
	//var val = K.Cache.get(ll, 'weather');
	//return val || K.Cache.set(ll, weatherAPI(ll), 'weather', 'daily');

	writeOut(req, res, out);
});

Router.route(urls.usersCount, opts)
.get(function (req, res) {

	var noClassify = req.query['noClassify'];

	var out = K.Stats.findUsersCountByDate();
	
	//ll = K.Util.geo.roundLoc(ll, 2);
	//var val = K.Cache.get(ll, 'weather');
	//return val || K.Cache.set(ll, weatherAPI(ll), 'weather', 'daily');

	writeOut(req, res, out);
});