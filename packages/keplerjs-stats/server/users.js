/*
	//TODO move it in plugin api
*/
WebApp.connectHandlers.use('/stats/users',function(req, res, next) {

	var noClassify = req.query['noClassify'];

	var out = JSON.stringify( K.Stats.findUsers(noClassify) );
console.log(out)
	if(req.query && req.query['jsonp'])
		out = req.query['jsonp']+'('+out+');';

	res.writeHead(200, {'Content-type': 'application/json'});
	res.end(out);
});

Meteor.methods({
	findUsersStats: function(noClassify) {
		return K.Stats.findUsers(noClassify);
	}
});