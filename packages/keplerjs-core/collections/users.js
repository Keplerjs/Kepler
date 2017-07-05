
Users = Meteor.users;

Users.allow({
	update: function (userId, doc, fieldNames, modifier) {
		return userId && doc._id === userId;
	}
});

K.queries({
	findCurrentUser: function(userId) {
		return Users.find(userId, { fields: K.Field.currentUser });
	},
	findUsersByName: function(initial) {
		initial = K.Util.sanitizeRegExp(initial);

		if(initial.length < Meteor.settings.public.searchMinLen)
			return null;

		var reg = new RegExp('^'+ initial, 'i'),
			curUser = Users.find({
				//$or: [{	//in futuro cerca per username
					name: reg
					//},{username: reg}
			//	]
			}, { fields: K.Field.userItem });

		return curUser;	
	},
	findUsersByIds: function(usersIds) {

		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

		return Users.find({_id: usersIds }, { fields: K.Field.userItem });
	},
	findUserById: function(userId) {

		return Users.find(userId, { fields: K.Field.userPanel });
	},
	findFriendsByIds: function(usersIds) {

		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

		//TODO show friend location only if me is online

		return Users.find({_id: usersIds }, { fields: K.Field.friendItem });
	},
	findFriendById: function(userId) {
		return Users.find(userId, { fields: K.Field.friendPanel });
	}
});