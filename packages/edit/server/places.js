
Meteor.methods({
	insertPlace: function(obj) {

		if(!this.userId) return null;

		var place = _.deepExtend({}, K.schemas.place, obj, {active:1});

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
			userId = placeData ? placeData.userId : null;

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
			throw new Meteor.Error(500, i18n('error_edit_notOwner'));

	},
	updatePlace: function(placeId, data) {
		
		if(!this.userId) return null;

		var placeData = Places.findOne(placeId),
			userId = placeData.userId || null;
		
		if(userId === this.userId || (K.Admin && K.Admin.isMe())) {

			if(data.name)
				data.name = K.Util.sanitize.name(data.name);
			
			if(data.desc)
				data.desc = K.Util.sanitize.text(data.desc);

			if(data.url)
				data.url = K.Util.sanitize.url(data.url);
				
			Places.update(placeId, {
				$set: data
			});

			console.log('Edit: updatePlace', placeData.name);
		}	
	}
});