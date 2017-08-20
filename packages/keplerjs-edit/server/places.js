
Meteor.methods({
	insertPlace: function(obj) {

		if(!this.userId) return null;

		var place = _.deepExtend({}, K.schemas.place, obj);

		var placeId = Places.insert(place);

		Users.update(Meteor.userId(), {
			$addToSet: {
				places: placeId
			}
		});
		console.log('Edit: insertPlace', place.name || placeId);

		return placeId;
	},
	removePlace: function(placeId) {

		if(!this.userId) return null;

		var placeData = Places.findOne(placeId);
		
		if(placeData.userId === this.userId) {
			
			Places.remove(placeId);

			console.log('Edit: removePlace', placeId);
		}		
	},
	updatePlace: function(placeId, data) {
		
		if(!this.userId) return null;

		var placeData = Places.findOne(placeId);
		
		if(placeData.userId === this.userId) {

			Places.update(placeId, {
				$set: {
					name: K.Util.sanitize.name(data.name)
				}
			});

			console.log('Edit: renamePlace', data.name);			
		}	
	},	
});