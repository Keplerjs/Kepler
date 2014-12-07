
Meteor.publish('currentUser', function() {

	//console.log('Pub: currentUser', this.userId);
	
	if(this.userId)
		return getCurrentUser(this.userId);
	else
		this.ready();
});
