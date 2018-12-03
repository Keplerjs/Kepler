
Meteor.publish('usersByCategory', function(cat) {
	if(this.userId) {
		var cur = K.findUsersByCategory(cat);
		console.log('Pub: usersByCategory', cat);
		return cur;
	}
	else
		this.ready();	
});

