//https://github.com/mondora/mondora-iron-router-rest-auth/
//TODO use https://github.com/kahmali/meteor-restivus
//
var baseUrl = K.settings.public.api.baseUrl,
	opts = { 
		where: 'server',
		notFoundTemplate: 'empty'
	};

var urls ={
	root: baseUrl,
	place: baseUrl+'/place/:name',
	placeHist: baseUrl+'/place/:name/hist',
	placeCheckins: baseUrl+'/place/:name/checkins',
	placeConvers: baseUrl+'/place/:name/convers',
	searchPlace: baseUrl+'/search/place/:name',
	searchUser: baseUrl+'/search/user/:name'
};

Kepler.Api = {
	version: K.version,
	urls: {
		api: urls
	}
};

function writeOut(req, res, out) {
	
	console.log('Api:', req.url);
	
	if(out) {
		res.writeHead(200, {
			'Content-type': _.isObject(out) ? 'application/json' : 'text/html'
		});
	} else {
		res.writeHead(400, {
			'Content-type': 'application/json'
		});
		out = {'error': 'Not Found'};
	}

	res.end( _.isObject(out) ? JSON.stringify(out,null,4) : out );
}

Router.route(urls.root, opts)
.get(function (req, res) {

	var out = K.Api;
/*	var out = K.Util.json2html(K.Api.urls, function(v,k) {
		return '<a href="'+v+'">'+v+'</a>';
	}); */
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
