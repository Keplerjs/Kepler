/*
	modulo gestione conversazioni e messaggi privati

	TODO!!! emoticons e users tag
	http://ichord.github.io/At.js/
*/

Kepler.conver = {

	newConver: function(targetId, targetType, title) {
		Meteor.call('newConver', targetId, targetType, title, function(err, convId) {
			K.router.go('panelConver',{convId: convId});
		});
	},

	delConver: function(convId) {
		Meteor.call('delConver', convId);
	},

	addMsgToConver: function(convId, body) {	//TODO spostare lato server
		
		body = K.Util.sanitizeMsg(body);
		//TODO move to Messages.allow

		if(!_.str.isBlank(body))
			addMsgToConver(convId, body);
	},
	
	loadConverWithUser: function(userId) {
		Meteor.call('getConverWithUser', userId, function(err, convId) {
			K.router.go('panelConver', {convId: convId });
		});
	}	
};






