/*
	//TODO move it in plugin api
*/
WebApp.connectHandlers.use('/stats/places',function(req, res, next) {

	//console.log('Stats: ', req.originalUrl)

	res.writeHead(200, {
		'Content-type': 'application/json'
	});
	
	var data = Places.find({}, {
		fields: { createdAt:1, loc:1, rank:1, checkins:1, hist:1, convers:1 },
		sort: { createdAt: -1},
		//TODO limit
	}).fetch();

	var features = _.map(data, function(d) {
		var loc = K.Util.geo.roundLoc(d.loc, 2);
		return K.Util.geo.createFeature('Point', loc.reverse(), {
				rank: (d.rank+1) * 
					  (d.checkins && d.checkins.length+1) * 
					  (d.convers && d.convers.length+1) *
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
