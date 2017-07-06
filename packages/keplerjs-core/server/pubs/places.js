
Meteor.publish('placesByBBox', function(bbox) {
	if(this.userId) {
		var cur = K.findPlacesByBBox(bbox);
		console.log('Pub: placesByBBox ', cur.count() );
		return cur;
	}
	else
		this.ready();
});

Meteor.publish('placesByName', function(initial) {
	if(this.userId) {
		var cur = K.findPlacesByName(initial);
		console.log('Pub: placesByName', initial, cur ? cur.count() : 0 );
		return cur;
	}
	else
		this.ready();	
});


Meteor.publish('placeById', function(placeId) {

	if(this.userId)
	{
		var placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0],
			retCurs = [];

		retCurs.push(placeCur);

		var usersIds = _.union(placeData.hist, placeData.checkins);
		
		if(usersIds.length > 0)
			retCurs.push( K.findUsersByIds(usersIds) );
		//publish one cursor for collection users

		console.log('Pub: placeById', placeData.name);

		return retCurs;
	}
	else
		this.ready();	
});

Meteor.publish('placesByIds', function(placesIds) {

	console.log('Pub: placesByIds', placesIds);

	if(this.userId)
		return K.findPlacesByIds(placesIds);	
	else
		this.ready();	
});
