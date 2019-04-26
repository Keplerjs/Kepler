
Messages = new Mongo.Collection('messages');
//TODO rinomina in ConversMsgs

K.Messages = Messages;

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

K.extend({
	findMsgsByConver: function(convId) {
		return Messages.find({convId: convId }, {
			sort: ['updatedAt']
		});
	},
	insertLeaveToConver: function(convId) {
		var body = '<br />'+i18n('title_userConverleave', Meteor.user().name);
		
		var convData = Convers.findOne(convId),
			lastMsg = convData && convData.lastMsg,
			newMsg = _.deepExtend({}, K.schemas.converMsg, {
				updatedAt: K.Util.time(),
				userId: '',
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
		
		//TODO simplify using upsert

		Users.update(Meteor.userId(), {
			$pull: {
				convers: convId
			}
		});
		Convers.update(convId, {
			$pull: {
				usersIds: Meteor.userId()
			}
		});
	},
	insertMsgToConver: function(convId, body) {

		var convData = Convers.findOne(convId),
			lastMsg = convData && convData.lastMsg,
			newMsg = _.deepExtend({}, K.schemas.converMsg, {
				updatedAt: K.Util.time(),
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
		
		//TODO simplify using upsert

		Convers.update(convId, {
			$addToSet: {
				usersIds: Meteor.userId()
			},
			$set: {
				lastMsg: newMsg
			}
		});
		Users.update(Meteor.userId(), {
			$addToSet: {
				convers: convId
			}
		});
	}
});
