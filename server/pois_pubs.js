

Meteor.publish('poisByLoc', function(loc) {

	//TODO caching con Climbo.cache.js se necessario

	console.log('Pub: poisByLoc', loc);

	if(this.userId)
		return getPoisByLoc(loc);
	else
		this.ready();	
});