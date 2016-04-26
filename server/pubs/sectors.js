
Meteor.publish('sectorsByIds', function(sectIds) {

	console.log('Pub: sectorsByIds', sectIds);

	if(this.userId)
		return getSectorsByIds(sectIds);
	else
		this.ready();	
});

Meteor.publish('sectorsByLoc', function(loc) {

	console.log('Pub: sectorsByLoc', loc);

	if(this.userId)
		return getSectorsByLoc(loc);
	else
		this.ready();	
});
