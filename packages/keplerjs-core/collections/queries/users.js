
K.extend({
	findCurrentUser: function(userId) {
		return Users.find(userId, K.filters.currentUser);
	},
	findUsersByIds: function(usersIds) {

		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

		return Users.find({_id: usersIds }, K.filters.userItem);
	},
	findUserById: function(userId) {

		return Users.find(userId, K.filters.userPanel);
	},	
	findFriendsByIds: function(usersIds) {

		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

		//TODO show friend location only if me is online

		return Users.find({_id: usersIds }, _.extend({}, K.filters.friendItem, {
				sort: {
					status: -1,
					name: 1
				}
			})
		);
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
	},
	findUsersByName: function(initial) {
		initial = K.Util.sanitize.regExp(initial);

		if(!initial.length)
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
	findUsersByDate: function() {
		/*
		TODO may be unuseful
		var date = new Date();
			date.setDate(date.getDate() - 10),
			dateFrom = K.Util.time(date);
		*/
		var user = Meteor.user(),
			exIds = _.union(user._id, user.friends);

		return Users.find({
			_id: {$nin: exIds}
			//$ne: {$and: Meteor.user().friends}
			/*createdAt: {
				'$gte': dateFrom
			}*/
		}, _.extend({}, K.filters.userPanel, {
				sort: { 
					createdAt: -1
				},
				limit: 30
			})
		);
	}
});