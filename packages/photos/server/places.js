
var fs = Npm.require('fs');

Meteor.methods({
	
	updatePlacePhoto: function(fileObj, placeId) {

		if(!this.userId) return null;

		var target = 'photos_places',
			imageOpts = K.settings.public.upload.targets[target].imageOpts,
			path = K.settings.upload.targets[target].path;

		var placeData = Places.findOne(placeId);

		if(placeData.userId === this.userId || (K.Admin && K.Admin.isMe())) {
			
			var fileOri = Meteor.call('storePhoto', fileObj, path);
			var fileMin = Meteor.call('resizePhoto', fileOri, imageOpts, path);
			//TODO var exifData = Meteor.call('exifPhoto', fileOri, path);

			Places.update(placeId, {
				$set: {
					photo: fileMin
				}
			});

			console.log('Photos: updatePlacePhoto', placeId)

			return fileMin;
		}
	},

	removePlacePhoto: function(placeId) {

		if(!this.userId) return null;

		var sets = K.settings.upload.targets['photos_places'];

		var placeData = Places.findOne(placeId);

		if( (placeData && placeData.userId === this.userId) || 
			(K.Admin && K.Admin.isMe()) ) {
		
			var placeData = Places.findOne(placeId),
				filePhoto = sets.path+ placeData.photo;

			if(fs.existsSync(filePhoto)) {
				fs.unlinkSync(filePhoto);
				console.log('Photos: remove photo file', filePhoto);
			}

			Places.update(placeId, {
				$set: {
					photo: ''
				}
			});

			console.log('Photos: removePlacePhoto', placeId);
		}
	}
});