//https://github.com/mondora/mondora-iron-router-rest-auth/

var urls = {
		root: '/api',
		place: '/api/place/:name',
		placeHist: '/api/place/:name/hist',
		placeCheckins: '/api/place/:name/checkins',
		placeConvers: '/api/place/:name/convers',
		searchPlace: '/api/search/place/:name',
		searchUser: '/api/search/user/:name'
	},
	opts = { 
		where: 'server',
		notFoundTemplate: 'empty'
	};

function writeOut(req, res, out) {
	
	console.log('Api:', req.url, out);
	
	if(out) {
		res.writeHead(200, {
			'Content-type': 'application/json'
		});
	} else {
		res.writeHead(400, {
			'Content-type': 'application/json'
		});
		out = {'error': 'Not Found'};
	}

	res.end( JSON.stringify(out) );
}

Router.route(urls.root, opts)
.get(function (req, res) {

	var out = {};

	_.each(urls, function(path, name) {
		path = path.replace(/^\//,'')
				   .replace(/:name/,'<name>');
		out[name] = Meteor.absoluteUrl(path);
	});

	writeOut(req, res, out);
});

Router.route(urls.place, opts)
.get(function (req, res) {

	var out = Places.findOne({name: this.params.name }, K.filters.placeItemApi);

	writeOut(req, res, out);
});

Router.route(urls.placeHist, opts)
.get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.getUsersByIds(placeData.hist).fetch();

	writeOut(req, res, out);
});

Router.route(urls.placeCheckins, opts)
.get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.getUsersByIds(placeData.checkins).fetch();

	writeOut(req, res, out);
});

Router.route(urls.placeConvers, opts)
.get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.getConversByIds(placeData.convers).fetch();

	writeOut(req, res, out);
});

Router.route(urls.searchPlace, opts)
.get(function (req, res) {

	var out = K.getPlacesByName(this.params.name).fetch();

	writeOut(req, res, out);
});

Router.route(urls.searchUser, opts)
.get(function (req, res) {

	var out = K.getPlacesByName(this.params.name).fetch();

	writeOut(req, res, out);
});