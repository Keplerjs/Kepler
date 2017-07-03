
newPlaceByLoc = function(loc) {

	var placeData = _.extend(K.schemas.place, {
			loc: K.util.geo.roundLoc(loc)
		}),
		placeId = Places.insert(placeData);

	console.log('newPlaceByLoc', loc, placeId);

	return placeId;
};

Meteor.methods({
	newPlaceByLoc: function(loc) {

		if(!this.userId || !K.util.valid.loc(loc)) return null;

		return newPlaceByLoc(loc);
	}
});
