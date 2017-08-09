
K.extend({
	findCurrentUser: function(userId) {
		return Users.find(userId, K.filters.currentUser);
	},
	findUsersByName: function(initial) {
		initial = K.Util.sanitizeRegExp(initial);

		if(initial.length < 2)
			return null;

		var reg = new RegExp('^'+ initial, 'i'),
			curUser = Users.find({
				//$or: [{	//in futuro cerca per username
					name: reg
					//},{username: reg}
			//	]
			}, K.filters.userItem);

		return curUser;	
	},
	findUsersByIds: function(usersIds) {

		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

		return Users.find({_id: usersIds }, K.filters.userItem);
	},
/*	findUsersBlockMe: function(usersIds) {

		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

		return Users.find({_id: usersIds }, K.filters.userBlockMe);
	},	*/
	findUserById: function(userId) {

		return Users.find(userId, K.filters.userPanel);
	},
	findFriendsByIds: function(usersIds) {

		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

		//TODO show friend location only if me is online

		return Users.find({_id: usersIds }, K.filters.friendItem);
	},
	findFriendById: function(userId) {
		return Users.find(userId, K.filters.friendPanel);
	},
	updateFriendship: function(userId, addUserId) {
		if(userId !== addUserId) {
			//remove from pending
			Users.update(userId, {
				$pull: {usersReceive: addUserId},
				$addToSet: {friends: addUserId}
			});
			//add to friends list
			Users.update(addUserId, {
				$pull: {usersPending: userId},
				$addToSet: {friends: userId}
			});
		}
	}	
});