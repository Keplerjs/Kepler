
Meteor.publish('osmByPlace', function(placeId) {

	if(this.userId) {

		var placeCur = getPlacesByIds([placeId]),
			placeData = placeCur.fetch()[0];

		console.log('Pub: osmByPlace', placeId);

		return [
			placeCur,
			getOsmByLoc(placeData.loc)
		];	
	}
	else
		this.ready();	
});