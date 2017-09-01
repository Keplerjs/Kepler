
WebApp.connectHandlers.use('/stats/users',function(req, res, next) {

	console.log('Stats: ', req.originalUrl)

	res.writeHead(200, {
		'Content-type': 'application/json'
	});
	
	var data = Users.find({}, {
		fields: {loc:1, loclast:1, places:1, friends:1, convers:1, hist:1}
	}).fetch();

	var features = _.map(data, function(d) {
		var loc = K.Util.geo.roundLoc(d.loc || d.loclast, 2) || [];
		return K.Util.geo.createFeature('Point', loc.reverse(), {
				rank: (d.places && d.places.length+1) * 
					  (d.friends && d.friends.length+1) * 
					  (d.convers && d.convers.length+1) *
					  (d.hist && d.hist.length+1)
			});
	});

	data = K.Util.geo.createFeatureColl(features);

	var jsonp = (req.query && req.query.jsonp) || 'jsonpcall';

	res.end(jsonp+'('+JSON.stringify(data)+');');
});
