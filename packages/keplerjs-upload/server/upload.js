

Meteor.startup(function() {

	var fs = Npm.require('fs');

	if(!fs.existsSync(Meteor.settings.dirs.avatars)) {
		console.log('making avatars directory ', Meteor.settings.dirs.avatars);
		fs.mkdirSync(Meteor.settings.dirs.avatars, 0755);
	}
});


Meteor.methods({
	
	uploadFile: function(fileObj, target) {

		if(!this.userId) return null;

		var fs = Npm.require('fs');

		var	filePath = Meteor.settings.dirs.avatars,
			fileUrl = Meteor.settings.public.urls.avatars,
			imgSize = Meteor.settings.public.avatarSize,
			fileUid = Meteor.user().username +'_'+ K.Util.time(),
			fileName = K.Util.sanitizeFilename( fileUid ),
			fileMin = fileName + _.template('_{width}x{height}.min.jpg', imgSize),
			fileBig = fileName + '.ori.jpg',
			imgOpts = _.extend(imgSize, {
				srcPath: filePath + fileBig,
				dstPath: filePath + fileMin,
				customArgs: ['-auto-orient']
			});

		if(!K.Util.valid.image(fileObj)) {
			
			console.log('uploadFile: error ', _.omit(fileObj,'blob') );

			throw new Meteor.Error(500, i18n('upload.error_imageNotValid') + K.Util.humanize.filesize(Meteor.settings.public.maxImageSize) );
		}

		console.log('uploadFile: wrinting...', fileBig);
		fs.writeFileSync(filePath + fileBig, fileObj.blob, 'binary');
		fs.chmodSync(filePath + fileBig, 0755);

		if(!Imagemagick)
			fileMin = fileBig;
		else
		{
			console.log('uploadFile: resizing...');
			try {

				Imagemagick.crop(imgOpts);

				fs.chmodSync(filePath + fileMin, 0755);
			}
			catch(e) {
				console.log('uploadFile: error ', e);
				return i18n('upload.error_imageNotValid');
			}
			console.log('uploadFile: resized', fileMin);
		}
		console.log('uploadFile: url ', fileMin );

		return fileUrl + fileMin;
	}
});