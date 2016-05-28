
Messages = new Mongo.Collection('messages');
//TODO rinomina in ConversMsgs

Messages.allow({
	insert: function(userId, doc) {

		//TODO body = K.util.sanitizeMsg(body);
		
		return userId && doc.convId;
	},
	update: function(userId, doc, fieldNames, modifier) {
		return userId && doc.userId === userId;
	},
	remove: function(userId, doc) {
		return userId && doc.userId === userId;
	}
});

getMsgsByConver = function(convId) {
	return Messages.find({convId: convId }, {sort: ['updateAt']});
};

addMsgToConver = function(convId, body) {

	var convData = Convers.findOne(convId),
		lastMsg = convData && convData.lastMsg,
		newMsg = _.extend(K.schemas.converMsg, {
			updateAt: K.util.timeUnix(),
			userId: Meteor.userId(),
			convId: convId,
			body: body
		});

	if(lastMsg && lastMsg.userId === newMsg.userId)	//append to my last msg
	{
		newMsg.body = lastMsg.body +'<br /> '+ newMsg.body;
		delete newMsg._id;
		Messages.update({_id: lastMsg._id }, {
			$set: newMsg
		});
		newMsg._id = lastMsg._id;
	}
	else
		newMsg._id = Messages.insert(newMsg);
	//TODO forse si semplifica con upsert o forse no

	Convers.update(convId, {
		$addToSet: {
			usersIds: Meteor.userId()
		},
		$set: {
			lastMsg: newMsg
		}
	});
};
