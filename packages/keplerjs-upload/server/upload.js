

Meteor.startup(function() {

	var fs = Npm.require('fs');

	_.each(Meteor.settings.upload.targets, function(conf) {
		if(!fs.existsSync(conf.path)) {
			console.log('Upload: create target path ', conf.path);
			fs.mkdirSync(conf.path, 0755);
		}
	});
});


Meteor.methods({
	
	uploadFile: function(fileObj, target) {

		if(!this.userId) return null;

		var fs = Npm.require('fs');

		if(!Meteor.settings.upload.targets[target]) {
			throw new Meteor.Error(500, i18n('upload_error_targetNotValid')+' '+target);
			return null;
		}

		var upSets = Meteor.settings.upload.targets[target];

		var	filePath = upSets.path,
			fileUrl = upSets.url,
			imgSize = {
				width: 140,
				height: 140,
				quality: 0.8
			},
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
			
			console.log('Upload: error ', _.omit(fileObj,'blob') );

			throw new Meteor.Error(500, i18n('upload_error_imageNotValid') + K.Util.humanize.filesize(Meteor.settings.public.maxFileSize) );
		}

		console.log('Upload: wrinting...', fileBig);
		fs.writeFileSync(filePath + fileBig, fileObj.blob, 'binary');
		fs.chmodSync(filePath + fileBig, 0755);

		if(!Imagemagick)
			fileMin = fileBig;
		else
		{
			console.log('Upload: resizing...');
			try {

				Imagemagick.crop(imgOpts);

				fs.chmodSync(filePath + fileMin, 0755);
			}
			catch(e) {
				console.log('Upload: error ', e);
				return i18n('upload_error_imageNotValid');
			}
			console.log('Upload: resized', fileMin);
		}
		console.log('Upload: url ', fileMin );

		return fileUrl + fileMin;
	}
});