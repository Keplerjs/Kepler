
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
	
	//TODO doc.userId = userId;
});
/*
Convers.after.update(function(userId, doc, fieldNames, modifier) {

	console.log('Convers.after.update',doc.targetType)

	//if private conver update target user
	if(doc.targetType==='user')
		
	//TODO FIXME ottimizzare... non eseguire sempre ad ogni messaggio
});
*/
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