
Meteor.publish('osmByPlace', function(placeId) {

	if(this.userId) {

		var placeCur = K.findPlacesByIds([placeId]),
			placeData = placeCur.fetch()[0];

		console.log('Pub: osmByPlace', placeId);

		return [
			placeCur,
			K.findOsmByLoc(placeData.loc)
		];	
	}
	else
		this.ready();	
});