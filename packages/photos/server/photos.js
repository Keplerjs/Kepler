
var fs = Npm.require('fs');
var Future = Npm.require("fibers/future");
var Imagemagick = Npm.require("imagemagick");

if(!Imagemagick) {
	console.warn('Photos: Imagemagick not installed');
	throw new Meteor.Error(500);
}

var CHMOD = 0755;

var ImagemagickSync = {};
["identify", "readMetadata", "convert", "resize", "crop"].forEach(function(fn) {
    ImagemagickSync[fn] = function(args) {
        var future = new Future();
        var cb = future.resolver();
        Imagemagick[fn](args, cb);
        return future.wait();
    };
});    

Meteor.methods({
	
	resizePhoto: function(fileObj, sets) {

		if(!this.userId) return null;

		var basePath = sets.path,
			baseUrl = sets.url,
			username = Meteor.user().username,
			fileName = K.Util.sanitize.filename( username +'_'+ K.Util.time() ),
			fileOut = fileName + '.ori.jpg';

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
			ImagemagickSync.crop(imgOpts);
			fs.chmodSync(imgOpts.dstPath, CHMOD);
		}
		catch(e) {
			console.log('Photos: error ', e);
			throw new Meteor.Error(500, i18n('upload_error_imageNotValid') );
			return i18n('upload_error_imageNotValid');
		}

		fileOut = fileMin;
	
	//TODO move to profile.js
	//
		var url = baseUrl + fileOut;
		
		console.log('Photos: resized', url);

		return url;
	},

	exifPhoto: function(fileObj, sets) {
		
		if(!this.userId) return null;

		var basePath = sets.path,
			baseUrl = sets.url,
			username = Meteor.user().username,
			fileName = K.Util.sanitize.filename( username +'_'+ K.Util.time() ),
			fileOut = fileName + '.ori.jpg';

		fs.writeFileSync(sets.path + fileOut, fileObj.blob, 'binary');
		fs.chmodSync(sets.path + fileOut, CHMOD);

		try {
			var meta = ImagemagickSync.readMetadata(basePath + fileOut);
		}
		catch(e) {
			console.log('Photos: error ', e);
			throw new Meteor.Error(500, i18n('upload_error_imageNotValid') );
			return i18n('upload_error_imageNotValid');
		}

		var exif = _.omit(meta.exif,'makerNote');

		console.log('Photos: exifPhoto ', exif)

		/*gpsAltitude: "447000/1000"
		gpsAltitudeRef: "0"
		gpsDateStamp: "2018:11:10"
		gpsInfo: "20990"
		gpsLatitude: "46/1, 3/1, 51821/1000"
		gpsLatitudeRef: "N"
		gpsLongitude: "11/1, 9/1, 29574/1000"
		gpsLongitudeRef: "E"
		gpsMapDatum: "WGS-84"
		gpsStatus: "A"
		gpsTimeStamp: "10/1, 42/1, 25000/1000"
		gpsVersionID: "2, 2, 0, 0"*/

		var lats = exif.gpsLatitude.split(',').map(function(v) {
				return parseInt(v.split('/')[0]);
			}),
			lngs = exif.gpsLongitude.split(',').map(function(v) {
				return parseInt(v.split('/')[0]);
			}),
			lat = lats[0]+'°'+lats[1]+"'"+(lats[2]/1000)+'"'+exif.gpsLatitudeRef,
			lng = lngs[0]+'°'+lngs[1]+"'"+(lngs[2]/1000)+'"'+exif.gpsLongitudeRef;			
//example: parseDMS('59°12\'7.7"N 02°15\'39.6"W')

		exif.loc = K.Util.geo.parseDMS(lat+' '+lng);
		
		return exif;
	}
});
