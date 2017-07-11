
Meteor.methods({
	adminGetMethods: function() {
	
		if(!K.Admin.isMe()) return false;

		console.log('Admin: adminGetMethods');

		return _.keys(K.Admin.method);
	}
});


Users.after.insert(function(userId, doc) {
	
	var userAdmin = Users.findOne({username:'admin'});

	K.updateFriendship(doc._id, userAdmin._id);
});


Accounts.onLogin(function(login) {

	Users.update(login.user._id, {
		$set: {
			isAdmin: K.Admin.isMe(login.user)
		}
	});
});
