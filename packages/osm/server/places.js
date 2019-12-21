
Meteor.methods({
	insertPlaceByOsmId: function(osmId) {

		if(!this.userId) return null;

		var placeOld = Places.findOne({'osm.id': osmId});

		if(placeOld) {
			console.log('Osm: insertPlaceByOsmId just exists', osmId)
			return placeOld._id; 
		}

		var obj = K.Osm.findById(osmId),
			placeOsm = K.Osm.osmToPlace(obj);

		var placeId = Meteor.call('insertPlace', placeOsm);
		
		console.log('Osm: insertPlaceByOsmId', osmId);

		return placeId;
	},
	updatePlaceByOsmId: function(placeId, osmId) {

		if(!this.userId) return null;

		var placeData = Places.findOne(placeId),
			userId = placeData.userId || null;

		osmId = osmId || placeData.osm.id;

		if(osmId && (userId === this.userId || (K.Admin && K.Admin.isMe()))) {
		
			var obj = K.Osm.findById(osmId),
				placeOsm = K.Osm.osmToPlace(obj);

			if(placeOsm) {
				Places.update(placeId, {
					$set: placeOsm
				});
				
				console.log('Osm: updatePlaceOsm', placeId, osmId);
			}
		}
	}	
});
