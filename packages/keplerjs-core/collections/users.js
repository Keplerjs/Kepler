
Users = Meteor.users;

Users.allow({
	update: function (userId, doc, fields, modifier) {
		return userId && doc._id === userId;
	}
});
