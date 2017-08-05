
Meteor.methods({
	adminGetMethods: function() {
	
		if(!K.Admin.isMe()) return false;

		console.log('Admin: adminGetMethods');

		return _.keys(K.Admin.method);
	}
});


Users.after.insert(function(userId, doc) {
	
	if(K.settings.admin.adminUsers) {
		var userAdmin = Users.findOne({username: K.settings.admin.adminUsers[0] });
		if(userAdmin)
			K.updateFriendship(doc._id, userAdmin._id);
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
