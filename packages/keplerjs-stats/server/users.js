/*
	//TODO move it in plugin api
*/
WebApp.connectHandlers.use('/stats/users',function(req, res, next) {

	var noClassify = req.query['noClassify'];

	var out = JSON.stringify( K.Stats.findUsers(noClassify) );

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



/*
//ONLY FOR DEBUG

WebApp.connectHandlers.use('/stats/usernames',function(req, res, next) {

	var data = Users.find({}).fetch();

	data = _.map(data, function(d) {
		var name =  K.Util.getPath(d,'services.google.name') || 
					K.Util.getPath(d,'services.facebook.name');
		return [name, K.Util.sanitize.username(name)];
	});

	data = _.filter(data, function(d) {
		return !!d[0];
	});

	var out = '';
	_.map(data, function(d) {
		out += d[0]+"\t\t\t\t\t\t"+d[1]+"\n\n"
	});

	res.writeHead(200, {'Content-type': 'text/plain'});
	res.end(out);
});
//*/