
var isAdmin = function() {
	if(!Meteor.user()) return false;
	return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
};

Meteor.methods({
	adminDeleteAllConvers: function() {
		
		if(!isAdmin()) return null;

		Convers.remove({});
		Users.update({}, {
			$set: {
				convers: []
			}
   		},{multi: true});
		Places.update({}, {
			$set: {
				convers: []
			}
   		},{multi: true});
		console.log('adminDeleteAllConvers');
	}	
});