
Meteor.methods({
	insertPlace: function(obj) {

		if(!this.userId) return null;

		var place = _.deepExtend({}, K.schemas.place, obj);
console.log('insertPlace',place)
		var placeId = Places.insert(place);

		console.log('insertPlace', place.name || placeId);

		return placeId;
	}	
});