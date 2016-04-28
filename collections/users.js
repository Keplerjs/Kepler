
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
