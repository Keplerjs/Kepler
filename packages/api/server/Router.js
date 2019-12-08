//https://github.com/mondora/mondora-iron-router-rest-auth/
//TODO use https://github.com/kahmali/meteor-restivus
//
var opts = { 
		where: 'server',
		notFoundTemplate: 'empty'
	};

var baseUrl = K.settings.public.api.baseUrl,
	urls = K.settings.public.api.urls;

_.each(K.settings.public.api.urls, function(v,k) {
	urls[k]= baseUrl+v;
});

K.Api = {
	
	urls: {
		api: urls
		//other plugins append urls here
	},

	writeOut: function(req, res, out) {

		out = out || {'error': 'Not Found'};

		var headers = _.defaults(K.settings.api.headers, {
			'Content-type': 'application/json'
		});

		var ret = JSON.stringify(out,null,4);

		if(K.settings.api.jsonp && req.query && req.query['jsonp']) {

			ret = req.query['jsonp']+'('+ret+');';

			headers['Content-type']= 'application/javascript';
		}

		res.writeHead(!out.error ? 200 :400, headers);

		res.end(ret);
	}
};

Router.onBeforeAction(function (req, res) {
	
	if(K.settings.api.enableRest)
		this.next();
	else {
		res.writeHead(403, {'Content-type': 'application/json'});
		res.end(JSON.stringify({"error": "Api REST disabled K.settings.api.enableRest"},null,4));
	}
});

Router.route(urls.root, opts).get(function (req, res) {

	var out = {
		version: K.version,
		urls: K.Api.urls,
	};

	K.Api.writeOut(req, res, out);
});

Router.route(urls.place, opts).get(function (req, res) {

	var out = Places.findOne({name: this.params.name }, K.filters.placeItemApi);

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placeHist, opts).get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.findUsersByIds(placeData.hist).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placeCheckins, opts).get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.findUsersByIds(placeData.checkins).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placeConvers, opts).get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.findConversByIds(placeData.convers).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(urls.searchPlace, opts).get(function (req, res) {

	var out = K.findPlacesByName(this.params.name).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(urls.searchUser, opts).get(function (req, res) {

	var out = K.findPlacesByName(this.params.name).fetch();

	K.Api.writeOut(req, res, out);
});
