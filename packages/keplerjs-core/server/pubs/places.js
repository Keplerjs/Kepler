
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
	if(this.userId) {
		var placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0],
			retCurs = [];

		retCurs.push(placeCur);
		
		if(!placeData)
			return retCurs;

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
	if(this.userId) {
		console.log('Pub: placesByIds', placesIds);
		return K.findPlacesByIds(placesIds);	
	}
	else
		this.ready();	
});

Meteor.publish('placesByDate', function(daysAgo) {
	if(this.userId) {
		console.log('Pub: placesByDate', daysAgo);
		return K.findPlacesByDate(daysAgo);
	}
	else
		this.ready();
});