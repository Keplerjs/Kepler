
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

		var placeData = Places.findOne(placeId),
			userId = placeData.userId || null;

		if(userId === this.userId || (K.Admin && K.Admin.isMe())) {
			
			Places.remove(placeId);
			//TODO remove other references
			Users.update(Meteor.userId(), {
				$pull: {
					places: placeId
				}
			});
			console.log('Edit: removePlace', placeId);
		}
		else
			throw new Meteor.Error(500, i18n('edit_error_notOwner'));

	},
	updatePlace: function(placeId, data) {
		
		if(!this.userId) return null;

		var placeData = Places.findOne(placeId),
			userId = placeData.userId || null;
		
		if(userId === this.userId || (K.Admin && K.Admin.isMe())) {

			Places.update(placeId, {
				$set: {
					name: K.Util.sanitize.name(data.name)
				}
			});

			console.log('Edit: updatePlace', data.name);			
		}	
	}
});