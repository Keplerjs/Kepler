
K.queries({
	insertPlaceByLoc: function(loc) {

		var placeData = _.extend(K.Schema.placa, {
				loc: K.Util.geo.roundLoc(loc)
			}),
			placeId = Places.insert(placeData);

		console.log('insertPlaceByLoc', loc, placeId);

		return placeId;
	}
});

Meteor.methods({
	insertPlaceByLoc: function(loc) {

		if(!this.userId || !K.Util.valid.loc(loc)) return null;

		return K.insertPlaceByLoc(loc);
	}
});
