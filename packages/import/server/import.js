
Meteor.methods({
	
	importFile: function(fileObj, target) {

		if(!this.userId) return null;

		var geo = JSON.parse(fileObj.blob)
		
		console.log('Import: ', fileObj.name, K.Util.humanize.filesize(fileObj.size))

		return geo;


		//TODO import geojson in a cache collection 

/*
		if(!K.settings.upload.targets[target]) {
			throw new Meteor.Error(500, i18n('upload_error_targetNotValid')+' '+target);
			return null;
		}

		var upSets = K.settings.upload.targets[target];

		var	filePath = upSets.path,
			fileUrl = upSets.url,
			imgSize = {
				width: 140,
				height: 140,
				quality: 0.8
			},
			fileUid = Meteor.user().username +'_'+ K.Util.time(),
			fileName = K.Util.sanitize.filename( fileUid ),
			fileMin = fileName + K.Util.tmpl('_{width}x{height}.min.jpg', imgSize),
			fileBig = fileName + '.ori.jpg',
			imgOpts = _.extend(imgSize, {
				srcPath: filePath + fileBig,
				dstPath: filePath + fileMin,
				customArgs: ['-auto-orient']
			});

		fileObj.size = Buffer.byteLength(fileObj.blob, 'binary');

		if(fileObj.size > K.settings.public.upload.maxFileSize) {
			
			console.log('Upload: error ', _.omit(fileObj,'blob') );

			throw new Meteor.Error(500, i18n('upload_error_imageNotValid') + K.Util.humanize.filesize(K.settings.public.maxFileSize) );
		}

		console.log('Upload: wrinting...', fileBig);
		fs.writeFileSync(filePath + fileBig, fileObj.blob, 'binary');
		fs.chmodSync(filePath + fileBig, CHMOD);

		if(!Imagemagick)
			fileMin = fileBig;
		else
		{
			console.log('Upload: resizing...');
			try {

				Imagemagick.crop(imgOpts);

				fs.chmodSync(filePath + fileMin, CHMOD);
			}
			catch(e) {
				console.log('Upload: error ', e);
				return i18n('upload_error_imageNotValid');
			}
			console.log('Upload: resized', fileMin);
		}
		console.log('Upload: url ', fileMin );

		return fileUrl + fileMin;*/
	}
});