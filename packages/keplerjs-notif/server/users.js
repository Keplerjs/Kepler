
Users.after.update(function(userId, doc, fieldNames, modifier, options) {


	//TODO refact in some case userId is not defined

	if(userId!==doc._id && _.contains(fieldNames,'usersReceive')) {

		console.log('Notif: ',modifier )

		//userId = modifier['$addToSet'].friends;
		var userData = Users.findOne(userId,{fields:{username:1}});

		Users.update(doc._id, {
			$push: {
				notifs: {
					createdAt: K.Util.time(),					
					type: 'users',
					msg: i18n('btn_friendreceive')+' <a href="/user/'+userData._id+'"><b>'+userData.username+'</b></a>'
				}
			}
		});
   	}
   	else if(userId!==doc._id && modifier['$addToSet'] && _.contains(fieldNames,'friends')) {

		console.log('Notif: ',userId, modifier )
		
		userId = modifier['$addToSet'].friends;

		if(_.isString(userId)) {
			var userData = Users.findOne(userId,{fields:{username:1}});

			if(userData)
			Users.update(doc._id, {
				$push: {
					notifs: {
						createdAt: K.Util.time(),
						type: 'users',
						msg: i18n('btn_friendnew')+' <a href="/user/'+userData._id+'"><b>'+userData.username+'</b></a>'
					}
				}
			});
		}
   	}
});
