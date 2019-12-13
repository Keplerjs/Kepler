
Meteor.publish('usersByCategory', function(cat) {
	if(this.userId || K.settings.public.router.publicRoutes.usersCats) {
		var cur = K.findUsersByCategory(cat);
		console.log('Pub: usersByCategory', cat);
		return cur;
	}
	else
		this.ready();	
});

