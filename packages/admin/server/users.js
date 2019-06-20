
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

	if(K.settings.admin.adminsAutoFriendship)
		K.updateFriendshipAdmins(user._id);

	//user created by admin
	if( K.settings.admin.emailOnNewUser && 
		K.Util.getPath(user,'source.options.source.service') !== 'kepler-admin') {

		//TODO create a template of body
		K.adminsEmail("User new: "+ user.username,
				"<h4>"+user.username+"</h4>"+
				Meteor.absoluteUrl("user/"+user._id)+"<br />"+
				user.name+"<br />"+
				'<img height="80px" widht="80px" src="'+user.avatar+'" /><br />'+
				(user.emails[0] && user.emails[0].address)+"<br />"+
				user.source.url+"<br />"+
				user.lang);
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

		if(Meteor.user().username===username) return null;

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
		
		console.log('Admin: createFriendship',username1,username2 )

		if(user1 && user2)
			K.updateFriendship(user1._id, user2._id);
	},
	removeFriendship: function(username1, username2) {
		//TODO
		/*if(!K.Admin.isMe()) return null;

		var user1 = Users.findOne({username: username1 }),
			user2 = Users.findOne({username: username2 })
		
		console.log('Admin: removeFriendship',username1,username2 )

		if(user1 && user2)
			K.updateFriendship(user1._id, user2._id);*/
	},
	logoutUser: function(username) {
		
		if(!K.Admin.isMe()) return null;

		Users.update({username: username}, {
			$set: {
				"services.resume.loginTokens" : []
			}
		});
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
