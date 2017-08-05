
Meteor.methods({
	insertPlaceByLoc: function(loc) {

		if(!this.userId || !K.Util.valid.loc(loc)) return null;

		var placeId = Places.insert({
				loc: K.Util.geo.roundLoc(loc)
			});

		console.log('insertPlaceByLoc', loc, placeId);

		return placeId;
	}
});
