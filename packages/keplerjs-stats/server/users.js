/*
	//TODO move it in plugin api
*/
var geostats = Npm.require('geostats');

WebApp.connectHandlers.use('/stats/users',function(req, res, next) {
	//console.log('Stats: ', req.originalUrl)

	var data = Users.find({isAdmin: false}, {
		fields: { createdAt:1, loc:1, loclast:1, places:1, friends:1, convers:1, hist:1, favorites:1 },
		sort: { createdAt: -1},
		//TODO limit
	}).fetch();

	//Clean data and calculate factors
	var data = _.map(data, function(d) {

		var f = (1+_.size(d.favorites)) * 
				(1+_.size(d.friends)) * 
				(1+_.size(d.convers)) *
				(1+_.size(d.places)) * 
				(1+_.size(d.hist));

		return {
			loc: K.Util.geo.roundLoc(d.loc || d.loclast, 2) || [],
			factor: f
		}
	});

	var noClassify = !!req.query['noClassify'];

	if(!noClassify) {
		var factors = _.pluck(data, 'factor');
		var series = new geostats(factors);
		var classy = series.getClassQuantile(10);
		//var classy = series.getClassEqInterval(10);
		//var classy = series.getClassJenks(10);
	}

	//Create geojson
	var features = _.map(data, function(d) {
		return K.Util.geo.createFeature('Point', d.loc.reverse(), {
			rank: noClassify ? d.factor : series.getClass(d.factor)
		});
	});

	var out = JSON.stringify(K.Util.geo.createFeatureColl(features));

	if(req.query && req.query['jsonp'])
		out = req.query['jsonp']+'('+out+');';

	res.writeHead(200, {'Content-type': 'application/json'});
	res.end(out);
});
