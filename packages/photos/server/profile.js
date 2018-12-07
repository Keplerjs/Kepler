
//TODO
Meteor.methods({
	updateAvatar: function(fileObj, opts) {

		//TODO move fs.writeFileSync from photos.js to here
		//TODO accept two files

		if(!this.userId) return null;

		var target = 'photos_avatars',
			sets = K.settings.public.upload.targets[target],
			imageOpts = sets.imageOpts,
			path = K.settings.upload.targets[target].path;

		var fileOri = Meteor.call('storePhoto', fileObj, path);
		var fileMin = Meteor.call('resizePhoto', fileOri, imageOpts, path);

		if(fileMin) {
			Users.update(this.userId, {
				$set: {
					avatar: sets.url + fileMin
				}
			});
		}

		return sets.url + fileMin;
	}
});
