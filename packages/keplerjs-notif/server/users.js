
Users.after.update(function(userId, doc, fieldNames, modifier, options) {
	
	if(userId!==doc._id && _.contains(fieldNames,'usersReceive')) {


		var userData = Users.findOne(userId)

		Users.update(doc._id, {
			$push: {
				notifs: {
					type: 'users',
					msg: 'Richiesta amicizia da <a href="/user/'+userId+'"><b>'+userData.username+'</b></a>'
				}
			}
		});
   	}
   	else if(userId!==doc._id && _.contains(fieldNames,'friends')) {

		var userData = Users.findOne(userId)

		Users.update(doc._id, {
			$push: {
				notifs: {
					type: 'users',
					msg: 'Amicizia accettata da <a href="/user/'+userId+'"><b>'+userData.username+'</b></a>'
				}
			}
		});
   	}
});
