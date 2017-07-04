
Meteor.methods({
	
	uploadAvatar: function(fileObj) {

		if(!this.userId) return null;

		var fs = Npm.require('fs');

		var	filePath = Meteor.settings.dirs.avatars,
			fileUrl = Meteor.settings.public.urls.avatars,
			imgSize = Meteor.settings.public.avatarSize,
			fileUid = Meteor.user().username +'_'+ K.Util.timeUnix(),
			fileName = K.Util.sanitizeFilename( fileUid ),
			fileMin = fileName + _.template('_{width}x{height}.min.jpg', imgSize),
			fileBig = fileName + '.ori.jpg',
			imgOpts = _.extend(imgSize, {
				srcPath: filePath + fileBig,
				dstPath: filePath + fileMin,
				customArgs: ['-auto-orient']
			});

		if(!K.Util.valid.image(fileObj)) {
			console.log('uploadAvatar: error ', _.omit(fileObj,'blob') );
			throw new Meteor.Error(500, i18n('errors.imageNotValid') + K.Util.humanize.filesize(Meteor.settings.public.maxImageSize) );
		}

		console.log('uploadAvatar: wrinting...', fileBig);
		fs.writeFileSync(filePath + fileBig, fileObj.blob, 'binary');
		fs.chmodSync(filePath + fileBig, 0755);

		if(!Imagemagick)
			fileMin = fileBig;
		else
		{
			console.log('uploadAvatar: resizing...');
			try {

				Imagemagick.crop(imgOpts);

				fs.chmodSync(filePath + fileMin, 0755);
			}
			catch(e) {
				console.log('uploadAvatar: error ', e);
				return i18n('errors.imageNotValid');
			}
			console.log('uploadAvatar: resized', fileMin);
		}


		Users.update(this.userId, {
			$set: {
				avatar: fileUrl + fileMin
			}
		});
		console.log('uploadAvatar: url ', fileMin );
	}
});