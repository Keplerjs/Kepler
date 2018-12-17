
/**
 * add all admins in the user friends list without add user in the admin friend list
 * @param  {[type]} userId [description]
 * @return {[type]}        [description]
 */
K.updateFriendshipAdmins = function(userId) {
	
	var admins = Users.find({isAdmin: 1}).fetch(),
		ids = _.pluck(admins,'_id');

	ids = _.without(ids, userId);

	Users.update(userId, {
		$addToSet: {
			friends: {
				$each: ids
			}
		}
	});
};

Users.after.insert(function(userId, user) {

	if(user.isRobot) return false;

	if(K.settings.admin.adminUsers && K.settings.admin.adminUsers.length) {

		//add all admins in the user friends list
		K.updateFriendshipAdmins(user._id);

		//user created by admin
		if( K.settings.admin.emailOnNewUser && 
			K.Util.getPath(user,'source.options.source.service')!=="kepler-admin") {

			Users.find({isAdmin: 1}).forEach(function (userAdmin) {

				if(userAdmin.emails && userAdmin.emails[0] && userAdmin.emails[0].address) {
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
				emails: [{
					address: username+'@keplerjs.io',
					verified: true
				}],
				name: _.str.capitalize(username),
				source: {
					service: "kepler-admin"
				}
			});
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
	updateUserPassword: function(username, passNew) {

		if(!K.Admin.isMe()) return null;

		var userData = Users.findOne({username: username });

		if(userData) {
			Accounts.setPassword(userData._id, passNew);
		}
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
