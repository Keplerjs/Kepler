
Meteor.methods({
	adminGetMethods: function() {
	
		if(!K.Admin.isMe()) return false;

		console.log('Admin: adminGetMethods');

		return _.keys(K.Admin.method);
	}
});


Accounts.onLogin(function(login) {

	if(login.user && login.user._id)
		Users.update(login.user._id, {
			$set: {
				isAdmin: K.Admin.isMe(login.user) ? 1 : 0
			}
		});
});
