

Meteor.publish('poisByPlace', function(placeId) {

	if(this.userId) {

		var placeCur = getPlacesByIds([placeId]),
			placeData = placeCur.fetch()[0];

		console.log('Pub: poisByPlace', placeId, placeData);

		return [
			placeCur,
			getPoisByLoc(placeData.loc)
		];	
	}
	else
		this.ready();	
});