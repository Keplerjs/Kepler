var isAdmin = function() {
	if(!Meteor.user()) return false;
	return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
};

Meteor.methods({
	adminCreateNotif: function(text) {
		
		if(!isAdmin()) return null;

		Users.update(this.userId, {
			$push: {
				notif: text
			}
   		});

		console.log('adminCreateNotif');
	}
});