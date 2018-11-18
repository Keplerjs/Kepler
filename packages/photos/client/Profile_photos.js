
_.extend(K.Profile, {
	//TODO move to plugin photos
	setAvatar: function(url) {
		Users.update(Meteor.userId(), {
			$set: {
				//TODO sanitize url
				avatar: url
			}
		});
	}
});