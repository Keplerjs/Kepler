/*
	modulo gestione conversazioni e messaggi privati

	TODO!!! emoticons e users tag
	http://ichord.github.io/At.js/
*/

Kepler.conver = {

	loadConverWithUser: function(userId) {
		Meteor.call('getConverWithUser', userId, function(err, convId) {

			console.log('getConverWithUser',convId)

			K.router.go('conver',{convId: convId});
		});
	},

	newConverInPlace: function(placeId, title) {
		Meteor.call('newConverInPlace', placeId, title, function(err, convId) {
			
			console.log('newConverInPlace',convId)

			K.router.go('conver',{convId: convId});
		});
	},

	addMsgToConver: function(convId, body) {	//TODO spostare lato server
		
		body = K.util.sanitizeMsg(body);
		//TODO move to Messages.allow

		if(!_.str.isBlank(body))
			addMsgToConver(convId, body);
	},

	delConver: function(convId) {
		Meteor.call('delConver', convId);
	}
};






