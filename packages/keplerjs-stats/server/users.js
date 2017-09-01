/*
	//TODO move it in plugin api
*/
WebApp.connectHandlers.use('/stats/users',function(req, res, next) {

	//console.log('Stats: ', req.originalUrl)

	res.writeHead(200, {
		'Content-type': 'application/json'
	});
	
	var data = Users.find({}, {
		fields: { createdAt:1, loc:1, loclast:1, places:1, friends:1, convers:1, hist:1, favorites:1 },
		sort: { createdAt: -1},
		//TODO limit
	}).fetch();

	var features = _.map(data, function(d) {
		var loc = K.Util.geo.roundLoc(d.loc || d.loclast, 1) || [];
		return K.Util.geo.createFeature('Point', loc.reverse(), {
				rank: (d.favorites && d.favorites.length+1) * 
					  (d.friends && d.friends.length+1) * 
					  (d.convers && d.convers.length+1) *
					  (d.places && d.places.length+1) * 
					  (d.hist && d.hist.length+1)
			});
	});

	//TODO compute percentage of rank

	data = K.Util.geo.createFeatureColl(features);

	if(req.query && req.query['jsonp'])
		data = req.query['jsonp']+'('+JSON.stringify(data)+');';
	else
		data = JSON.stringify(data);

	res.end(data);
});
