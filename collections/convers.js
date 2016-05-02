
Convers = new Meteor.Collection('convers');

getConverById = function(convId) {
	//TODO ritorna solo ultimi 10 messaggi!!
	//TODO fare funzione scaricare messaggi un po alla volta
	return Convers.find(convId, { fields: K.perms.converPanel });
};

getConversByIds = function(convIds) {
	return Convers.find({_id: {$in: convIds} }, { fields: K.perms.converItem });
};

getConversByPlace = function(placeId) {
	return Convers.find({placeId: placeId }, { fields: K.perms.converItem });
};

//TODO
Convers.allow({
	insert: function(userId, doc) {
		return true;
	},
	update: function(userId, doc, fieldNames, modifier) {
		
		//se è una conver privata aggiorna destinatari
		if(!doc.placeId)
			Users.update({_id: {$in: doc.usersIds}}, {
				$addToSet: {convers: doc._id}
			}, {multi: true});
		//TODO FIXME ottimizzare... non eseguire sempre ad ogni messaggio

		return true;
	},
	remove: function(userId, doc) {
		return userId && doc.userId === userId;
	}
});
