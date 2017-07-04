//https://github.com/mondora/mondora-iron-router-rest-auth/

var paths = {
	root: '/api',
	place: '/api/place/:name',
	placeHist: '/api/place/:name/hist',
	placeCheckins: '/api/place/:name/checkins',
	placeConvers: '/api/place/:name/convers',
	searchPlace: '/api/search/place/:name'
};

Router.route(paths.root, { where: 'server'})
.get(function (req, res) {

	console.log('Api: ', req.url);

	_.each(paths, function(path, name) {
		paths[name] = path;
	});

	res.end( JSON.stringify(paths) );
});

Router.route(paths.place, { where: 'server'})
.get(function (req, res) {

	console.log('Api: ', req.url);

	var placeData = Places.findOne({name: this.params.name }, { fields: K.Field.placeItem });
	
	delete placeData.loc;

	res.end( JSON.stringify(placeData) );

});

Router.route(paths.placeHist, { where: 'server'})
.get(function (req, res) {

	console.log('Api: ', req.url);

	var placeData = Places.findOne({name: this.params.name }),
		users = placeData && getUsersByIds(placeData.hist).fetch();

	res.end( JSON.stringify(users) );

});

Router.route(paths.placeCheckins, { where: 'server'})
.get(function (req, res) {

	console.log('Api: ', req.url);

	var placeData = Places.findOne({name: this.params.name }),
		users = placeData && getUsersByIds(placeData.checkins).fetch();

	res.end( JSON.stringify(users) );

});

Router.route(paths.placeConvers, { where: 'server'})
.get(function (req, res) {

	console.log('Api: ', req.url);

	var placeData = Places.findOne({name: this.params.name }),
		convers = placeData && getConversByIds(placeData.convers).fetch();

	res.end( JSON.stringify(convers) );

});

Router.route(paths.searchPlace, { where: 'server'})
.get(function (req, res) {

	console.log('Api: ', req.url);

	var cur = getPlacesByName(this.params.name);
	
	res.end( JSON.stringify(cur.fetch()) );

});