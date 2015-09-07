/*
	modulo gestione conversazioni e messaggi privati

	TODO!!! emoticons e users tag
	http://ichord.github.io/At.js/
*/

Climbo.conver = {

	loadConverWithUser: function(userId) {
		Meteor.call('getConverWithUser', userId, function(err, convId) {
			Router.go('conver',{convId: convId});
		});
	},

	newConverInPlace: function(placeId, title) {
		Meteor.call('newConverInPlace', placeId, title, function(err, convId) {
			Router.go('conver',{convId: convId});
		});
	},

	addMsgToConver: function(convId, body) {	//TODO spostare lato server
		
		body = Climbo.util.sanitizeMsg(body);
		//TODO move to Messages.allow

		if(!_.str.isBlank(body))
			addMsgToConver(convId, body);
	},

	delConver: function(convId) {
		Meteor.call('delConver', convId);
	}
};






