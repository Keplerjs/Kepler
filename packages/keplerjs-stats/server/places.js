/*
	//TODO move it in plugin api
*/

WebApp.connectHandlers.use('/stats/places',function(req, res, next) {
	//console.log('Stats: ', req.originalUrl)

	var noClassify = !!req.query['noClassify'];

	var geojson = K.Stats.findPlaces(noClassify);

	var out = JSON.stringify(geojson);

	if(req.query && req.query['jsonp'])
		out = req.query['jsonp']+'('+out+');';

	res.writeHead(200, {'Content-type': 'application/json'});
	res.end(out);
});

Meteor.methods({
	findPlacesStats: function(noClassify) {
		return K.Stats.findPlaces(noClassify);
	}
});