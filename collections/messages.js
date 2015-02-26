
Messages = new Meteor.Collection('messages');
//TODO rinomina in ConversMsgs

getMsgsByConver = function(convId) {
	return Messages.find({convId: convId }, {sort: ['updateAt']});
};

addMsgToConver = function(convId, body) {

	var convData = Convers.findOne(convId),
		lastMsg = convData && convData.lastMsg,
		newMsg = {
			'convId': convId,
			'userId': Meteor.userId(),
			'updateAt': Climbo.util.timeUnix(),
			'body': Climbo.util.sanitizeMsg(body)
		};

	if(lastMsg && lastMsg.userId === newMsg.userId)	//append to my last msg
	{
		newMsg.body = lastMsg.body +'<br />'+ newMsg.body;
		Messages.update({_id: lastMsg._id }, {
			$set: newMsg
		});
		newMsg._id = lastMsg._id;
	}
	else
		newMsg._id = Messages.insert(newMsg);
	//TODO forse si semplifica con upsert o forse no

	Convers.update({_id: convId}, {
		$addToSet: { usersIds: Meteor.userId() },
		$set: { lastMsg: newMsg }
	});
};

Messages.allow({
	insert: function(userId, doc) {
		return userId && doc.convId;
	},
	update: function(userId, doc, fieldNames, modifier) {
		return userId && doc.userId === userId;
	},
	remove: function(userId, doc) {
		return userId && doc.userId === userId;
	}
});