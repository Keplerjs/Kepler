
Meteor.publish('osmByPlace', function(placeId) {

	if(this.userId) {

		var placeCur = K.getPlacesByIds([placeId]),
			placeData = placeCur.fetch()[0];

		console.log('Pub: osmByPlace', placeId);

		return [
			placeCur,
			K.getOsmByLoc(placeData.loc)
		];	
	}
	else
		this.ready();	
});