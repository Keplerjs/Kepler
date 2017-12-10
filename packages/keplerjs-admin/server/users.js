
Users.after.insert(function(userId, user) {

	if(K.settings.admin.adminUsers) {
		Users.find({
			username: {$in: K.settings.admin.adminUsers}
		}).forEach(function (userAdmin) {
			
			K.updateFriendship(user._id, userAdmin._id);

			if(userAdmin.emails[0] && userAdmin.emails[0].address) {
				Email.send({
					from: K.settings.accounts.emailTemplates.from,
					to: userAdmin.emails[0].address,
					subject: "New User: "+ user.username,
					html:
						"<h4>"+user.username+"</h4>"+
						Meteor.absoluteUrl("user/"+user._id)+"<br />"+
						user.name+"<br />"+
						'<img height="80px" widht="80px" src="'+user.avatar+'" /><br />'+
						user.source.url+"<br />"+
						user.lang+"<br />"
						//"<pre>"+JSON.stringify(user,null,'  ')+"</pre>"
				});	
			}
		});
	}
});

K.Admin.methods({
	insertUser: function(usernames) {
		//TODO https://docs.meteor.com/api/passwords.html#Accounts-createUser
		//
		if(!K.Admin.isMe()) return null;

		usernames = _.isArray(usernames) ? usernames : [usernames];

		for(var i in usernames) {
			var username = usernames[i];
			
			var userId = Accounts.createUser({
				username: username,
				password: username+username,
				email: username+'@gmail.com',
				name: _.str.capitalize(username)
			});

			if(userId)
				K.updateFriendship(this.userId, userId);
		}
	},
	removeUser: function(username) {
		
		if(!K.Admin.isMe()) return null;

		var userData = Users.findOne({username: username}),
			userId = userData._id;

		Users.update({}, {
			$pull: {
				friends: userId,
				usersPending: userId,
				usersReceive: userId,
				usersBlocked: userId,
			}
		},{ multi: true });
		Places.update({}, {
			$pull: {
				checkins: userId,
				hist: userId
			}
		},{ multi: true });
		Users.remove(userId);
	},
	createFriendship: function(username1, username2) {
		
		if(!K.Admin.isMe()) return null;

		var user1 = Users.findOne({username: username1 }),
			user2 = Users.findOne({username: username2 })
			
		K.updateFriendship(user1._id, user2._id);
	},
	cleanUserFriendship: function(username) {
		
		if(!K.Admin.isMe() || !username) return null;

		var userData = Users.findOne({username: username}),
			userId = userData._id;

		Users.update({_id: {$in: userData.friends }}, {
			$pull: {
				friends: userId
			}
		},{ multi: true });
		Users.update({username: username}, {
			$set: {
				friends: [],
				usersBlocked: [],	
				usersPending: [],
				usersReceive: []
			}
		},{ multi: true });
	},	
	cleanAllFriendship: function() {
		
		if(!K.Admin.isMe()) return null;

		Users.update({}, {
			$set: {
				friends: [],
				usersBlocked: [],	
				usersPending: [],
				usersReceive: []
			}
		}, { multi: true });
	}
});