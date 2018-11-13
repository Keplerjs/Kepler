
Notifs = new Mongo.Collection('notifs');

Notifs.allow({
	insert: function(userId, doc) {
		return false;// new notifications can only be created via a Meteor method
	},
	update: function(userId, doc) {
		return userId && doc._id === userId;
	},
	remove: function(userId, doc) {
		return userId && doc._id === userId;
	}
});

K.extend({
	insertNotif: function(text, type, url) {

		type = type || K.Notif._types[0];
		
		Users.update(Meteor.userId(), {
			$push: {
				notifs: {
					createdAt: K.Util.time(),
					seen: false,
					type: type,
					url: url,
					msg: text
				}
			}
		});
	}
});