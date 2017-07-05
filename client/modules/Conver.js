/*
	Module conversations and private messagges

	//TODO emoticons e users tag
	http://ichord.github.io/At.js/
*/

Kepler.Conver = {

	insertConver: function(targetId, targetType, title) {
		Meteor.call('insertConver', targetId, targetType, title, function(err, convId) {
			Router.go('panelConver',{convId: convId});
		});
	},

	removeConver: function(convId) {
		Meteor.call('removeConver', convId);
	},

	insertMsgToConver: function(convId, body) {	//TODO spostare lato server
		
		body = K.Util.sanitizeMsg(body);
		//TODO move to Messages.allow

		if(!_.str.isBlank(body))
			K.insertMsgToConver(convId, body);
	},
	
	loadConverWithUser: function(userId) {
		Meteor.call('findConverWithUser', userId, function(err, convId) {
			Router.go('panelConver', {convId: convId });
		});
	}	
};






