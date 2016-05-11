/*
	creazione, modifica e invio di conversazioni e messaggi
	o di conversazioni sulle bacheche dei luoghi
*/

newConver = function(title, placeId, usersIds) {

	placeId = placeId || null;
	title = title || '';
	usersIds = _.union(Meteor.userId(), usersIds || []);
	//inserire sempre il proprietario tra i partecipanti!

	var convId = Convers.insert({
		'title': title,			   //Topic(per le bacheche) o Oggetto(per le convers private)
		'placeId': placeId,        //se è null allora è una conversazione privata tra utenti
		'userId': Meteor.userId(), //proprietario/mittente della conversazione
		'usersIds': usersIds,      //partecipanti alla conversazione, TODO rinomina in followers
		'lastMsg': null
	});
	
	if(placeId)
		Places.update({_id: new Mongo.Collection.ObjectID(placeId) }, { $addToSet: {convers: convId} });

	Users.update(Meteor.userId(), {$addToSet: {convers: convId} });
	//la inserisce solo nei miei messaggi, finche non aggiungo un mesaggio

	console.log('newConver', Meteor.user().username, title);

	return convId;
};

getConverWithUser = function(userId) {
	//TODO forse eseguire solo lato client!!
	//TODO per conversa private tra piu utenti ricerca due userIds in campo array
	//https://groups.google.com/forum/?hl=it&fromgroups#!topic/mongodb-it/0ij4I54PXSY
	var convData = Convers.findOne({$and: [
									{ placeId: null},
									{ usersIds: {$size: 2} },
									{ usersIds: {$all: [Meteor.userId(), userId]} }
								]
							});
	if(convData)
		return convData._id;
	else
		return newConver(i18n('titles.userConver'), null, userId);
};

delConver = function(convId) {

	var convData = Convers.findOne(convId);
	
	if( Convers.remove({_id: convId, userId: Meteor.userId() }) )
	{
		Messages.remove({convId: convId});
		//TODO rimuove solo proprietario senza far sparire la conver
		//TODO rimuovere del tutto quando usersIds è vuoto
		Users.update({_id: {$in: convData.usersIds}}, { $pull: {convers: convId} }, {multi: true});
		//nascondi agli altri utenti

		if(convData.placeId)
			Places.update({_id: new Mongo.Collection.ObjectID(convData.placeId) }, { $pull: {convers: convId} });
	}
	else	//se non è il creatore della conver la abbandona
	{
		var leaveMsg = {
			updateAt: K.util.timeUnix(),			
			userId: Meteor.userId(),
			body: _.template(i18n('alerts.userleaveconv'), Meteor.user())
		};
		Messages.insert(leaveMsg);
		Users.update({_id: Meteor.userId() }, {
			$pull: {
				convers: convId
			}
		});
		Convers.update({_id: convId }, {
			$pull: {
				usersIds: Meteor.userId()
			},
			$set: {
				updateAt: K.util.timeUnix(),
				lastMsg: leaveMsg
			}
		});
	}
};

Meteor.methods({
	getConverWithUser: function(userId) {

		//TODO forse spostare lato client!!
		
		if(!this.userId || !userId) return null;

		return getConverWithUser(userId);
	},
	newConverInPlace: function(title, placeId) {

		if(!this.userId || !title || !placeId) return null;

		console.log('newConverInPlace',title,placeId);

		return newConver(title, placeId);
	},
	delConver: function(convId) {
		
		if(!this.userId || !convId) return null;

		console.log('delConver',convId);

		return delConver(convId);
	}
});



