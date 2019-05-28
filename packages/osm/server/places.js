
Meteor.methods({
	insertPlaceByOsmId: function(osmId) {

		if(!this.userId) return null;

		var obj = Meteor.call('findOsmById', osmId);
		
		if(!obj) return null;

		var placeData = K.Osm.osmToPlace(obj);
		
		var placeId = Meteor.call('insertPlace', placeData);
		
		console.log('Osm: insertPlaceByOsmId', osmId);

		return placeId;
	}
});
