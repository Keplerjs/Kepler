
newPlaceByLoc = function(loc) {

	var placeData = _.extend(K.Schema.placa, {
			loc: K.Util.geo.roundLoc(loc)
		}),
		placeId = Places.insert(placeData);

	console.log('newPlaceByLoc', loc, placeId);

	return placeId;
};

Meteor.methods({
	newPlaceByLoc: function(loc) {

		if(!this.userId || !K.Util.valid.loc(loc)) return null;

		return newPlaceByLoc(loc);
	}
});
