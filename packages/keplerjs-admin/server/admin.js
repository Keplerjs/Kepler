
Meteor.methods({
	adminGetMethods: function() {
	
		if(!K.Admin.isMe()) return false;

		console.log('Admin: adminGetMethods');

		return _.keys(K.Admin.method);
	}
});

Users.after.insert(function(userId, doc) {
	
	if(K.settings.admin.adminUsers) {
		Users.find({
			username: {$in: K.settings.admin.adminUsers}
		}).forEach(function (user) {
			K.updateFriendship(doc._id, user._id);
		});
	}
});


Accounts.onLogin(function(login) {

	if(login.user && login.user._id)
		Users.update(login.user._id, {
			$set: {
				isAdmin: K.Admin.isMe(login.user)
			}
		});
});
