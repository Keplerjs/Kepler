
K.Admin.methods({
	insertUser: function(usernames) {
		
		if(!K.Admin.isMe()) return null;

		usernames = _.isArray(usernames) ? usernames : [usernames];

		for(var i in usernames) {
			var username = usernames[i];
			
			var userId = Accounts.createUser({
				username: username,
				password: username,//+username,
				email: username+'@gmail.com'
			});

			K.updateFriendship(this.userId, userId);
		}
	},
	removeUser: function(username) {
		
		if(!K.Admin.isMe()) return null;

		var userData = Users.findOne({username: username}),
			userId = userData._id;

		Users.update({_id: {$in: userData.friends }}, {
			$pull: {
				friends: userId
			}
		});
		Places.update({_id: {$in: userData.hist }}, {
			$pull: {
				hist: userId
			}
		});
		Users.remove(userId);
	},
	createFriendship: function(username1, username2) {
		
		if(!K.Admin.isMe()) return null;

		var user1 = Users.findOne({username: username1 }),
			user2 = Users.findOne({username: username2 })
			
		K.updateFriendship(user1._id, user2._id);
	},
	cleanUserFriendship: function(username) {
		
		if(!K.Admin.isMe()) return null;

		var userData = Users.findOne({username: username}),
			userId = userData._id;

		Users.update({_id: {$in: userData.friends }}, {
			$pull: {
				friends: userId
			}
		});
		Users.update({username: username}, {
			$set: {
				friends: [],
				usersBlocked: [],	
				usersPending: [],
				usersReceive: []
			}
		});
	},	
	removeAllUsers: function() {
		
		if(!K.Admin.isMe()) return null;

		Users.find({_id: {$ne: this.userId }}).forEach(function(user) {
			Meteor.call('removeUser', user.username);
		});
		Users.update(this.userId, {
			$set: {
				friends: [],
				usersBlocked: [],
				usersPending: [],
				usersReceive: []
			}
   		});
	}	
});