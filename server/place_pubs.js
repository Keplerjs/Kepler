
Meteor.publish('placesByBBox', function(bbox) {
	if(this.userId) {
		var cur = getPlacesByBBox(bbox);
		console.log('Pub: placesByBBox ', cur.count() );
		return cur;
	}
	else
		this.ready();
});

Meteor.publish('placesByName', function(initial) {
	if(this.userId) {
		var cur = getPlacesByName(initial);
		console.log('Pub: placesByName', initial, cur ? cur.count() : 0 );
		return cur;
	}
	else
		this.ready();	
});


Meteor.publish('placeById', function(placeId) {

	if(this.userId)
	{
		var placeCur = getPlaceById(placeId),
			placeData = placeCur.fetch()[0],
			retCurs = [],
			userIds = [];

		retCurs.push(placeCur);

		if(placeData.hist.length > 0)
			retCurs.push( getUsersByIds(placeData.hist) );

		console.log('Pub: placeById', placeData.name);

		return retCurs;
	}
	else
		this.ready();	
});

Meteor.publish('placesByIds', function(placesIds) {

	console.log('Pub: placesByIds', placesIds);

	if(this.userId)
		return getPlacesByIds(placesIds);	
	else
		this.ready();	
});
