/*
	Override filters for users
	
 */
K.findUserById = function(userId) {
	return Users.find(userId, K.Admin.isMe()? {} : K.filters.userPanel);
};

K.findFriendById = function(userId) {
	return Users.find(userId, K.Admin.isMe()? {} : K.filters.friendPanel);
};
