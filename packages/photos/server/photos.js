
var fs = Npm.require('fs');
//TODO require  npm Imagemagick
// 
var CHMOD = 0755;

Meteor.methods({
	
	resizePhoto: function(fileObj, sets) {

		var basePath = sets.path,
			baseUrl = sets.url,
			username = Meteor.user().username,
			fileName = K.Util.sanitize.filename( username +'_'+ K.Util.time() ),
			fileOut = fileName + '.ori.jpg';

		if(!Imagemagick)
		{
			console.log('Photos: error Imagemagick not installed');
			throw new Meteor.Error(500);
			return null;
		}

		fs.writeFileSync(sets.path + fileOut, fileObj.blob, 'binary');
		fs.chmodSync(sets.path + fileOut, CHMOD);

		//TODO move to settings
		var imgSize = {
				width: 140,
				height: 140,
				quality: 0.8
			},
			fileMin = fileName + K.Util.tmpl('_{width}x{height}.min.jpg', imgSize),
			imgOpts = _.extend(imgSize, {
				srcPath: basePath + fileOut,
				dstPath: basePath + fileMin,
				customArgs: ['-auto-orient']
			});
		
		console.log('Photos: resizing...');

		try {

			Imagemagick.crop(imgOpts);

			fs.chmodSync(basePath + fileMin, CHMOD);
		}
		catch(e) {
			console.log('Photos: error ', e);
			return i18n('upload_error_imageNotValid');
		}

		fileOut = fileMin;

		console.log('Photos: resized', baseUrl + fileOut);

		return baseUrl + fileOut;
	}
});
