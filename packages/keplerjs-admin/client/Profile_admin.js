
//TODO may be refact

Kepler.Profile.hasFriend = function(userId) {
	//
	//Profile.hasFriend is used by User.isFriend()
	//
	if(K.Admin.isMe())
		return true;
	else
		return _.contains(this.data.friends, userId);
};
