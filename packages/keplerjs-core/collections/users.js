
Users = Meteor.users;

if(Meteor.isServer)
	Users._ensureIndex({"loc": "2d"});


Users.allow({
	update: function (userId, doc, fields, modifier) {
		return userId && doc._id === userId;
	}
});
