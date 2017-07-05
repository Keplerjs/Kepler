
Meteor.publish('tracksByIds', function(trackIds) {

	if(this.userId) {

		console.log('Pub: tracksByIds', trackIds);

		return [
			K.getTracksByIds(trackIds)
		];	
	}
	else
		this.ready();	
});


Meteor.publish('tracksByPlace', function(placeId) {

	if(this.userId) {

		var placeCur = K.getPlacesByIds([placeId]),
			placeData = placeCur.fetch()[0];

		console.log('Pub: tracksByPlace', placeId);

		return [
			placeCur,
			K.getTracksByLoc(placeData.loc)
		];	
	}
	else
		this.ready();	
});