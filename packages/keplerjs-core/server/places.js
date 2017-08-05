
Meteor.methods({
	insertPlace: function(obj) {

		if(!this.userId) return null;

		var place = _.deepExtend({}, K.schemas.place, obj);

		var placeId = Places.insert(place);

		console.log('insertPlace', place.name || placeId);

		return placeId;
	},
	removePlace: function(placeId) {

		if(!this.userId) return null;

		Places.remove(placeId);

		console.log('removePlace', placeId);
	}
});