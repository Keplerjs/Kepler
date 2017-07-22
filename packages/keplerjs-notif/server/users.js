
Users.after.update(function(userId, doc, fieldNames, modifier, options) {

	if(!userId) return false;	//userId is null when Meteor Accounts update users

	var userData = Users.findOne(userId);

	if(userId!==doc._id && _.contains(fieldNames,'usersReceive')) {

		Users.update(doc._id, {
			$push: {
				notifs: {
					createdAt: K.Util.time(),					
					type: 'users',
					msg: 'Richiesta amicizia da <a href="/user/'+userId+'"><b>'+userData.username+'</b></a>'
				}
			}
		});
   	}
   	else if(userId!==doc._id && _.contains(fieldNames,'friends') && modifier['$addToSet']) {

		Users.update(doc._id, {
			$push: {
				notifs: {
					createdAt: K.Util.time(),
					type: 'users',
					msg: 'Amicizia accettata da <a href="/user/'+userId+'"><b>'+userData.username+'</b></a>'
				}
			}
		});
   	}
});
