/*
	DEBUGGING FUNCTIONS
*/

var isAdmin = function(userId) {
	if(!userId) return false;
	
	console.log('isAdmin', Meteor.user().username)

	return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
};

Meteor.methods({
	adminCreateUser: function(username) {
		
		if(!isAdmin(this.userId)) return null;

		//TODO check User is Admin

		var userId = Accounts.createUser({
			username: username,
			password: username+username,
			email: username+'@gmail.com'			
		});

		confirmFriends(this.userId, userId);

		console.log('adminCreateUser', username, userId);	
	},
	adminDeleteUser: function(username) {
		
		if(!isAdmin(this.userId)) return null;

		var userData = Meteor.users.findOne({username: username}),
			userId = userData._id;

		Meteor.users.update({_id: {$in: userData.friends }}, {$pull: {friends: userId} });
		Meteor.users.remove(userId);

		console.log('adminDeleteUser', username);
	},
	adminCleanUserFriends: function(username) {
		
		if(!isAdmin(this.userId)) return null;

		var userData = Meteor.users.findOne({username: username}),
			userId = userData._id;

		Meteor.users.update({_id: {$in: userData.friends }}, {$pull: {friends: userId} });
		Meteor.users.update({username: username}, {
			$set: {
				friends: [],
				usersBlocked: [],			
				usersPending: [],
				usersReceive: []
			}
		});

		console.log('adminCleanUserFriends', username);
	},
	adminCreateFriendship: function(username1, username2) {
		
		if(!isAdmin(this.userId)) return null;

		//TODO check User is Admin
		var user1 = Meteor.users.findOne({username: username1}),
			user2 = Meteor.users.findOne({username: username2})
			
		confirmFriends(user1._id, user2._id);
			
		console.log('adminCreateFriendship', username1, username2);
	},	
	adminDeleteAllUsers: function() {
		
		if(!isAdmin(this.userId)) return null;

		Meteor.users.find({_id: {$ne: this.userId }}).forEach(function(user) {
			Meteor.call('adminDeleteUser', user.username);
		});
		
		console.log('adminDeleteAllUsers');
	}
});