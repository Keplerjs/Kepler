
Meteor.publish('poisByPlace', function(placeId) {

	if(this.userId) {

		var placeCur = K.getPlacesByIds([placeId]),
			placeData = placeCur.fetch()[0];

		console.log('Pub: poisByPlace', placeId);

		return [
			placeCur,
			K.getPoisByLoc(placeData.loc)
		];	
	}
	else
		this.ready();	
});