
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


/*
//TODO
Meteor.startup(function() {	
	if(!Users.findOne({username: 'admin'})) {
		console.log('Admin: autocreate admin account user: admin pass: adminadmin ');
		//TODO	
	}
});*/

/*
RESET admin password, uncomment for use

Meteor.methods({
	setpass: function(pass) {
		console.log('setpass',pass)
		var userData = Users.findOne({username: 'admin' });
		Accounts.setPassword(userData._id, pass);
	}
});*/