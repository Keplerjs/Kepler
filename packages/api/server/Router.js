//https://github.com/mondora/mondora-iron-router-rest-auth/
//TODO use https://github.com/kahmali/meteor-restivus
//
var opts = { 
		where: 'server',
		notFoundTemplate: 'empty'
	};

var baseUrl = K.settings.public.api.baseUrl,
	urls = K.settings.public.api.urls;

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
		res.end(JSON.stringify({"error": "Api REST disabled"},null,4));
	}
});

Router.route(baseUrl+urls.root, opts).get(function (req, res) {

	var out = {
		version: K.version,
		urls: K.Api.urls,
	};

	K.Api.writeOut(req, res, out);
});

Router.route(baseUrl+urls.place, opts).get(function (req, res) {

	var out = Places.findOne({name: this.params.name }, K.filters.placeItemApi);

	K.Api.writeOut(req, res, out);
});

Router.route(baseUrl+urls.placeHist, opts).get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.getUsersByIds(placeData.hist).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(baseUrl+urls.placeCheckins, opts).get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.getUsersByIds(placeData.checkins).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(baseUrl+urls.placeConvers, opts).get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.getConversByIds(placeData.convers).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(baseUrl+urls.searchPlace, opts).get(function (req, res) {

	var out = K.getPlacesByName(this.params.name).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(baseUrl+urls.searchUser, opts).get(function (req, res) {

	var out = K.getPlacesByName(this.params.name).fetch();

	K.Api.writeOut(req, res, out);
});
