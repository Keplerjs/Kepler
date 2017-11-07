/*
	//TODO move it in plugin api
*/
WebApp.connectHandlers.use('/stats/places',function(req, res, next) {

	var noClassify = req.query['noClassify'];

	var out = JSON.stringify( K.Stats.findPlaces(noClassify) );

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