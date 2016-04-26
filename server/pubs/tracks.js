
Meteor.publish('tracksByIds', function(tracksIds) {

	console.log('Pub: tracksByIds', tracksIds);

	if(this.userId)
		return getTracksByIds(tracksIds);
	else
		this.ready();	
});

Meteor.publish('tracksByLoc', function(loc) {

	//TODO caching con Climbo.cache.js se necessario

	console.log('Pub: tracksByLoc', loc);

	if(this.userId)
		return getTracksByLoc(loc);
	else
		this.ready();	
});