
Users = Meteor.users;

Users.allow({
	update: function (userId, doc, fieldNames, modifier) {
		return userId && doc._id === userId;
	}
});

getUsersByName = function(initial) {
	initial = Climbo.util.sanitizeRegExp(initial);

	if(initial.length < Meteor.settings.public.searchMinLen)
		return null;

	var reg = new RegExp('^'+ initial, 'i'),
		curUser = Users.find({
			//$or: [{	//in futuro cerca per username
				name: reg
				//},{username: reg}
		//	]
		}, { fields: Climbo.perms.userItem });

	return curUser;	
};

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
