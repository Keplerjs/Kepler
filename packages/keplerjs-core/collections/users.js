
Users = Meteor.users;

Users.allow({
	update: function (userId, doc, fieldNames, modifier) {
		return userId && doc._id === userId;
	}
});
