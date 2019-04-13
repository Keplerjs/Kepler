//https://github.com/mondora/mondora-iron-router-rest-auth/
//TODO use https://github.com/kahmali/meteor-restivus
//
var baseUrl = K.settings.api.baseUrl,
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

K.Api = {
	
	version: K.version,
	
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

		if(req.query && req.query['jsonp']) {

			ret = req.query['jsonp']+'('+ret+');';

			headers['Content-type']= 'application/javascript';
		}

		res.writeHead(!out.error ? 200 :400, headers);

		res.end(ret);
	}
};

Router.route(urls.root, opts)
.get(function (req, res) {

	var out = K.Api;

	K.Api.writeOut(req, res, out);
});

Router.route(urls.place, opts)
.get(function (req, res) {

	var out = Places.findOne({name: this.params.name }, K.filters.placeItemApi);

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placeHist, opts)
.get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.getUsersByIds(placeData.hist).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placeCheckins, opts)
.get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.getUsersByIds(placeData.checkins).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(urls.placeConvers, opts)
.get(function (req, res) {

	var placeData = Places.findOne({name: this.params.name }),
		out = placeData && K.getConversByIds(placeData.convers).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(urls.searchPlace, opts)
.get(function (req, res) {

	var out = K.getPlacesByName(this.params.name).fetch();

	K.Api.writeOut(req, res, out);
});

Router.route(urls.searchUser, opts)
.get(function (req, res) {

	var out = K.getPlacesByName(this.params.name).fetch();

	K.Api.writeOut(req, res, out);
});
