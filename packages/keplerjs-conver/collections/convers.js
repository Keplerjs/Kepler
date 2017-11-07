
Convers = new Mongo.Collection('convers');

Convers.allow({
	insert: function(userId, doc) {
		return true;
	},
	update: function(userId, doc) {
		return true;
	},	
	remove: function(userId, doc) {
		return userId && doc.userId === userId;
	}
});

//TODO
Convers.before.insert(function(userId, doc) {
	doc.createdAt = K.Util.time();
});

Convers.after.insert(function(userId, doc) {
	
	if(K.Notif) {
		if(doc.targetType==='user') {
			
			var userData = Users.findOne(userId);

			Users.update(doc.targetId, {
				$push: {
					notifs: {
						createdAt: K.Util.time(),
						type: 'mes',
						url: '/conver/'+doc._id,
						msg: i18n('label_newmesfrom')+' <a href="/user/'+userId+'"><b>'+userData.username+'</b></a>'
					}
				}
			});
		}
	}
});

K.extend({
	findConverById: function(convId) {
		//TODO ritornare solo ultimi 10 messaggi!!
		//TODO scaricare messaggi un po alla volta
		return Convers.find(convId, K.filters.converPanel);
	},
	findConversByIds: function(convIds) {
		
		convIds = _.isArray(convIds) ? {$in: convIds} : convIds;

		return Convers.find({_id: convIds }, K.filters.converItem);
	},
	findConversByTarget: function(targetId) {
		return Convers.find({targetId: targetId }, K.filters.converItem);
	},
	findConversByUser: function(userId) {
		return Convers.find({userId: userId, targetType:'place' }, K.filters.converItem);
	},
	findConversPlaces: function() {
	
		var date = new Date();
			date.setDate(date.getDate() - 10),
			dateFrom = K.Util.time(date);

		return Convers.find({
			targetType: 'place'
/*
TODO			createdAt: {
				'$gte': dateFrom
			}*/
		}, _.deepExtend({}, K.filters.converItem, {
				sort: { 'lastMsg.updatedAt': -1,  targetId: 1},
				limit: 100
			})
		);
	},	
});	