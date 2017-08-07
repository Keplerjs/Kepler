
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

		var placeData = Places.findOne(placeId);
		
		if(placeData.userId === this.userId)
			Places.remove(placeId);

		console.log('removePlace', placeId);
	}
});