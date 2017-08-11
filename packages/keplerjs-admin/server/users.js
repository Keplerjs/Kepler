
K.Admin.methods({
	insertUser: function(usernames) {
		
		if(!K.Admin.isMe()) return null;

		usernames = _.isArray(usernames) ? usernames : [usernames];

		for(var i in usernames) {
			var username = usernames[i];
			
			var userId = Accounts.createUser({
				name: username,
				username: username,
				password: username+username,
				email: username+'@gmail.com'
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
				friends: userId
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