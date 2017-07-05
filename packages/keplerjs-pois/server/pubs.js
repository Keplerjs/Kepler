
Meteor.publish('poisByPlace', function(placeId) {

	if(this.userId) {

		var placeCur = K.findPlacesByIds([placeId]),
			placeData = placeCur.fetch()[0];

		console.log('Pub: poisByPlace', placeId);

		return [
			placeCur,
			K.findPoisByLoc(placeData.loc)
		];	
	}
	else
		this.ready();	
});