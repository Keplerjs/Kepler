
Router.route('/api/place/:name', { where: 'server'})
.get(function (req, res) {

	console.log('Rest: ', req.url);

	var placeData = Places.findOne({name: this.params.name }, { fields: K.fields.placeItem });
	
	delete placeData.loc;

	res.end( JSON.stringify(placeData) );

});

Router.route('/api/place/:name/hist', { where: 'server'})
.get(function (req, res) {

	console.log('Rest: ', req.url);

	var placeData = Places.findOne({name: this.params.name }),
		users = getUsersByIds(placeData.hist).fetch();

	res.end( JSON.stringify(users) );

});

Router.route('/api/place/:name/checkins', { where: 'server'})
.get(function (req, res) {

	console.log('Rest: ', req.url);

	var placeData = Places.findOne({name: this.params.name }),
		users = getUsersByIds(placeData.checkins).fetch();

	res.end( JSON.stringify(users) );

});

Router.route('/api/place/:name/convers', { where: 'server'})
.get(function (req, res) {

	console.log('Rest: ', req.url);

	var placeData = Places.findOne({name: this.params.name }),
		convers = getConversByIds(placeData.convers).fetch();

	res.end( JSON.stringify(convers) );

});