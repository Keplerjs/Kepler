

Meteor.methods({
	
	updatePlacePhoto: function(fileObj, placeId) {

		if(!this.userId) return null;

		var sets = K.settings.upload.targets['photos_places'];

		var placeData = Places.findOne(placeId);

		if(placeData.userId === this.userId || (K.Admin && K.Admin.isMe())) {
				
			//var url = Meteor.call('resizePhoto', fileObj, sets);
			//var exif = Meteor.call('exifPhoto', fileObj, sets);
			
			var url = Meteor.call('uploadPhoto', fileObj, sets);

			Places.update(placeId, {
				$set: {
					photo: url
				}
			});

			console.log('Photos: updatePlacePhoto', placeId)

			return url;
		}
	},

	removePlacePhoto: function(placeId) {

		if(!this.userId) return null;

		var sets = K.settings.upload.targets['photos_places'];

		var placeData = Places.findOne(placeId);

		if( (placeData && placeData.userId === this.userId) || 
			(K.Admin && K.Admin.isMe()) ) {
		
			//var url = Meteor.call('resizePhoto', fileObj, sets);
			//var exif = Meteor.call('exifPhoto', fileObj, sets);
			//var url = Meteor.call('deletePhoto', placeData.photo, sets);

			Places.update(placeId, {
				$set: {
					photo: ''
				}
			});

			//TODO delete photo file

			console.log('Photos: removePlacePhoto', placeId);
		}
	}
});