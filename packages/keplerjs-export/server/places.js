
WebApp.connectHandlers.use('/export/places',function(req, res, next) {
	res.writeHead(200, {
		'Content-type': 'application/json'
	});
	
	var data = Places.find({}, K.filters.placeItem).fetch();

	var features = _.map(data, function(d) {
		return K.Util.geo.createFeature('Point', K.Util.geo.roundLoc(d.loc, 2).reverse() )
	});

	data = K.Util.geo.createFeatureColl(features);

	res.end(JSON.stringify(data));
});
