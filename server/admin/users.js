
var isAdmin = function() {
	if(!Meteor.user()) return false;
	return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
};

Meteor.methods({
	adminCreateUser: function(usernames) {
		
		if(!isAdmin()) return null;

		usernames = _.isArray(usernames) ? usernames : [usernames];

		for(var i in usernames) {
			var username = usernames[i];
			
			var userId = Accounts.createUser({
				username: username,
				password: username,//+username,
				email: username+'@gmail.com'
			});

			confirmFriends(this.userId, userId);

			console.log('adminCreateUser', username, userId);	
		}
	},
	adminDeleteUser: function(username) {
		
		if(!isAdmin()) return null;

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

		console.log('adminDeleteUser', username);
	},
	adminCreateFriendship: function(username1, username2) {
		
		if(!isAdmin()) return null;

		var user1 = Users.findOne({username: username1 }),
			user2 = Users.findOne({username: username2 })
			
		confirmFriends(user1._id, user2._id);
			
		console.log('adminCreateFriendship', username1, username2);
	},
	adminCleanUserFriendship: function(username) {
		
		if(!isAdmin()) return null;

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

		console.log('adminCleanUserFriends', username);
	},	
	adminDeleteAllUsers: function() {
		
		if(!isAdmin()) return null;

		Users.find({_id: {$ne: this.userId }}).forEach(function(user) {
			Meteor.call('adminDeleteUser', user.username);
		});
		Users.update(this.userId, {
			$set: {
				friends: [],
				usersBlocked: [],
				usersPending: [],
				usersReceive: []
			}
   		});
		console.log('adminDeleteAllUsers');
	}	
});