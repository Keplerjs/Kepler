/*
	creazione, modifica e invio di conversazioni e messaggi
	o di conversazioni sulle bacheche dei luoghi
*/
K.queries({
	newConver: function(targetId, targetType, title, usersIds) {

	//TODO use check()
	
		targetId = targetId || null;
		targetType = targetType || null;
		title = title || '';
		usersIds = _.union(Meteor.userId(), usersIds || []);

		if(targetType==='user')
			usersIds.push(targetId);

		var convData = _.extend(K.Schema.conver, {
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
		
		console.log('newConver', convId, targetId);

		return convId;
	},
	getConverWithUser: function(userId) {
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
			var user = K.getUsersByIds([userId]).fetch()[0],
				title = i18n('titles.userConver', user.name);

			convId = K.newConver(userId, 'user', title );
		}
		
		console.log('getConverWithUser', convId);

		return convId;
	},
	delConver: function(convId) {

		var convData = Convers.findOne(convId);
		
		if( Convers.remove({_id: convId, userId: Meteor.userId() }) )
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
		else	//se non è il creatore della conver la abbandona
		{
			K.addMsgToConver(convId, i18n('notifs.userleaveconv', Meteor.user().name) );
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
		}
		console.log('delConver', convId);
	}
});

Meteor.methods({
	getConverWithUser: function(userId) {

		//TODO forse spostare lato client!!
		
		if(!this.userId || !userId) return null;

		return K.getConverWithUser(userId);
	},
	newConver: function(targetId, targetType, title) {

		if(!this.userId || !title || !targetId) return null;

		console.log('newConver', targetId, targetType, title);

		return K.newConver(targetId, targetType, title);
	},
	delConver: function(convId) {
		
		if(!this.userId || !convId) return null;

		console.log('delConver',convId);

		return K.delConver(convId);
	}
});



