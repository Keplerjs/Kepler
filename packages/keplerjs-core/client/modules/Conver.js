/*
	Module conversations and private messagges

	//TODO emoticons e users tag
	http://ichord.github.io/At.js/
*/

Kepler.Conver = {

	newConver: function(targetId, targetType, title) {
		Meteor.call('newConver', targetId, targetType, title, function(err, convId) {
			Router.go('panelConver',{convId: convId});
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
			Router.go('panelConver', {convId: convId });
		});
	}	
};






