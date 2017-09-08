/*
	creazione, modifica e invio di conversazioni e messaggi
	o di conversazioni sulle bacheche dei luoghi
*/
K.extend({
	insertConver: function(targetId, targetType, title, usersIds) {

	//TODO use check()
	
		targetId = targetId || null;
		targetType = targetType || null;
		title = title || '';
		usersIds = _.union(Meteor.userId(), usersIds || []);

		if(targetType==='user')
			usersIds.push(targetId);

		var convData = _.extend({}, K.schemas.conver, {
				title: title,
				targetId: targetId,
				targetType: targetType,
				userId: Meteor.userId(),
				usersIds: usersIds,
				lastMsg: null
			}),
			convId = Convers.insert(convData);

		if(targetType==='place')
			Places.update(targetId, {
				$addToSet: {
					convers: convId
				}
			});

		Users.update(Meteor.userId(), {
			$addToSet: {
				convers: convId
			}
		});
		
		console.log('Conver: insertConver', convId, targetId);

		return convId;
	},
	findConverWithUser: function(userId) {
		var convId,
			convData = Convers.findOne({
				$and: [
					{ targetType: 'user' },
					//{ usersIds: {$size: 2} },
					{ usersIds: {$all: [Meteor.userId(), userId]} }
				]
			});

		if(convData)
			convId = convData._id;
		else
		{
			var user = K.findUsersByIds([userId]).fetch()[0],
				title = i18n('title_userConver', user.username);

			convId = K.insertConver(userId, 'user', title );
		}
		
		console.log('Conver: getConverWithUser', convId);

		return convId;
	},
	removeConver: function(convId) {

		var convData = Convers.findOne(convId);
		
		if( Convers.remove({_id: convId, userId: Meteor.userId() }) )
		//user is owner
		{
			Messages.remove({convId: convId});
			//TODO rimuove solo proprietario senza far sparire la conver
			//TODO rimuovere del tutto quando usersIds è vuoto
			Users.update({_id: {$in: convData.usersIds}}, {
				$pull: {convers: convId}
			}, {multi: true});
			//nascondi agli altri utenti

			if(convData.targetType==='place')
				Places.update(convData.targetId, {
					$pull: {
						convers: convId
					}
				});
		}
		else	//user isn't owner to leave conver
			K.insertLeaveToConver(convId);
			
		console.log('Conver: removeConver', convId);
	}
});

Meteor.methods({
	findConverWithUser: function(userId) {

		//TODO forse spostare lato client!!
		
		if(!this.userId || !userId) return null;

		return K.findConverWithUser(userId);
	},
	insertConver: function(targetId, targetType, title) {

		if(!this.userId || !title || !targetId) return null;

		console.log('Conver: insertConver', targetId, targetType, title);

		return K.insertConver(targetId, targetType, title);
	},
	removeConver: function(convId) {
		
		if(!this.userId || !convId) return null;

		console.log('Conver: removeConver',convId);

		return K.removeConver(convId);
	}
});
