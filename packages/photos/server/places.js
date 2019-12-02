
var fs = Npm.require('fs');

Meteor.methods({
	/**
	 * attach to place an uploaded photo
	 * @param  {Object} fileObj File uploader
	 * @param  {String} placeId place id to attach photo
	 * @return {String}         return place id
	 */
	updatePlacePhoto: function(fileObj, placeId) {

		if(!this.userId) return null;

		var target = 'photos_places',
			imageOpts = K.settings.public.upload.targets[target].imageOpts,
			path = K.settings.upload.targets[target].path;

		//create new place by photo exif
		if(!placeId) {

			var fileOri = Meteor.call('storePhoto', fileObj, path);
			var exifData = Meteor.call('exifPhoto', fileOri, path);
			var fileMin = Meteor.call('resizePhoto', fileOri, imageOpts, path);

			if(exifData && exifData.loc) {

				var place = _.deepExtend({}, K.schemas.place, {
					//name: K.Util.sanitize.name(fileObj.name),
					loc: exifData.loc,
					photo: fileMin,
					source: {
						type: 'photos'
					}
				});

				var placeId = Places.insert(place);

				Users.update(this.userId, {
					$addToSet: {
						places: placeId,
						photos: placeId
					}
				});

				console.log('Photos: updatePlacePhoto create new place ', placeId, exifData.loc)

				return placeId;
			}
			else {
				throw new Meteor.Error(500, i18n('error_photos_exifNotFound') );
			}

		}
		else {
	
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
				Users.update(this.userId, {
					$addToSet: {
						photos: placeId
					}
				});			

				console.log('Photos: updatePlacePhoto ', placeId)
			}
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