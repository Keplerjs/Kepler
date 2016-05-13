
var isAdmin = function() {
	if(!Meteor.user()) return false;
	return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
};

Meteor.methods({
	adminDeleteAllConvers: function() {
		
		if(!isAdmin()) return null;

		Convers.remove({_id: {$in: Meteor.user().convers }});
		Users.update(this.userId, {
			$set: {
				convers: []
			}
   		});
		console.log('adminDeleteAllConvers');
	}	
});