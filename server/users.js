
getUsersByIds = function(usersIds) {

	usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

	return Users.find({_id: usersIds }, { fields: Climbo.perms.userItem });
};

getUserById = function(userId) {

	return Users.find(userId, { fields: Climbo.perms.userPanel });
};

getFriendsByIds = function(usersIds) {

	usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;

//TODO show friend location only if me is online

	return Users.find({_id: usersIds }, { fields: Climbo.perms.friendItem });
};

getFriendById = function(userId) {
	return Users.find(userId, { fields: Climbo.perms.friendPanel });
};

confirmFriends = function(userId, addUserId) {
	//remove from pending
	Users.update(userId, {$pull: {usersReceive: addUserId} });
	Users.update(userId, {$addToSet: {friends: addUserId} });
	//add to friends list
	Users.update(addUserId, {$pull: {usersPending: userId} });
	Users.update(addUserId, {$addToSet: {friends: userId} });

	console.log('confirmFriends Added', userId, addUserId);
};