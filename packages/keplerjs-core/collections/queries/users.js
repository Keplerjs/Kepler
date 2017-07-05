
K.queries({
	findCurrentUser: function(userId) {
		return Users.find(userId, K.filter.currentUser);
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
			}, K.filter.userItem);

		return curUser;	
	},
	findUsersByIds: function(usersIds) {

		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

		return Users.find({_id: usersIds }, K.filter.userItem);
	},
	findUserById: function(userId) {

		return Users.find(userId, K.filter.userPanel);
	},
	findFriendsByIds: function(usersIds) {

		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

		//TODO show friend location only if me is online

		return Users.find({_id: usersIds }, K.filter.friendItem);
	},
	findFriendById: function(userId) {
		return Users.find(userId, K.filter.friendPanel);
	}
});