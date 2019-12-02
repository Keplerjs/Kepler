
var fs = Npm.require('fs');
var Future = Npm.require("fibers/future");
var Imagemagick = Npm.require("imagemagick");


//TODO https://github.com/aheckmann/gm

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
	storePhoto: function(fileObj, basePath) {

		if(!this.userId) return null;

		var username = Meteor.user().username,
			fileName = K.Util.sanitize.fileName( username +'_'+ K.Util.time() ),
			fileOri = fileName + '.ori.'+fileObj.ext;
		try {
			fs.writeFileSync(basePath + fileOri, fileObj.blob, 'binary');
			fs.chmodSync(basePath + fileOri, CHMOD);
		}
		catch(e) {
			console.warn('Photos: error to create file "'+basePath+fileOri+'"');
			throw new Meteor.Error(500, i18n('error_photos_imageNotValid') );
		}

		return fileOri;
	},

	resizePhoto: function(fileOri, imgOpts, basePath) {

		if(!this.userId) return null;

		//TODO move to settings
		var fileExt = K.Util.sanitize.fileExt(fileOri),
			fileMin = fileOri + K.Util.tmpl('_{width}x{height}.min.'+fileExt, imgOpts),
			opts = _.extend({}, imgOpts, {
				srcPath: basePath + fileOri,
				dstPath: basePath + fileMin,
				customArgs: ['-auto-orient']
			});
		
		console.log('Photos: resizing...', fileOri, _.values(imgOpts).join('x') );

		try {
			//TODO use npm gm
			//gm(fileObj, fileObj.name()).resize('10', '10').stream().pipe(writeStream);
			ImagemagickSync.crop(opts);
			fs.chmodSync(opts.dstPath, CHMOD);
		}
		catch(e) {
			console.warn('Photos: error to resize photo', opts.dstPath);
			throw new Meteor.Error(500, i18n('error_photos_imageNotValid') );
		}
	
		console.log('Photos: resized', fileMin);

		return fileMin;
	},

	//TODO change arguments accept file
	exifPhoto: function(fileOri, basePath) {
		
		if(!this.userId) return null;

		var exif;

		try {
			var meta = ImagemagickSync.readMetadata(basePath+fileOri);

			if(meta && meta.exif)
				exif = meta.exif;
			else {
				console.log('Photos: error to read exif from file ', basePath+fileOri, meta);
			}
		}
		catch(e) {
			console.log('Photos: error to read exif from file ', e);
			throw new Meteor.Error(500, i18n('error_photos_exifNotFound') );
		}
		
		if(exif && exif.gpsLatitude && exif.gpsLongitude) {
			var lats = exif.gpsLatitude.split(',').map(function(v) {
					return parseInt(v.split('/')[0]);
				}),
				lngs = exif.gpsLongitude.split(',').map(function(v) {
					return parseInt(v.split('/')[0]);
				}),
				lat = lats[0]+'°'+lats[1]+"'"+(lats[2]/1000)+'"'+exif.gpsLatitudeRef,
				lng = lngs[0]+'°'+lngs[1]+"'"+(lngs[2]/1000)+'"'+exif.gpsLongitudeRef;			
			//example: parseLoc('59°12\'7.7"N 02°15\'39.6"W')
			delete exif.makerNote;
			
			exif.loc = K.Util.geo.locParseString(lat+' '+lng);
		}

		console.log('Photos: exifPhoto ', basePath+fileOri);//exif);

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

		return exif;
	},
	/*	insertPhoto: function(targetId, targetType, title) {

		if(!this.userId || !title || !targetId) return null;

		console.log('Photos: insertPhoto', targetId, targetType, title);

		return K.insertPhoto(targetId, targetType, title);
	},
	removePhoto: function(photoId) {
		
		if(!this.userId || !photoId) return null;

		console.log('Photos: removePhoto',photoId);

		return K.removePhoto(photoId);
	},
*/
});

/*
K.extend({
	insertPhoto: function(targetId, targetType, url, title) {

		targetId = targetId || null;
		targetType = targetType || null;
		title = title || '';
		url = url || '';

		if(targetType==='user')
			targetId = Meteor.userId();

		var photoData = _.extend({}, K.schemas.photo, {
				title: title,
				url: url,
				targetId: targetId,
				targetType: targetType,
				userId: Meteor.userId(),
				loc: null,
				exif: null
			}),
			photoId = Photos.insert(photoData);

		if(targetType==='place')
			Places.update(targetId, {
				$addToSet: {
					photos: photoId
				}
			});
		else if(targetType==='user')
			userId = targetId;

		Users.update({_id: userId }, {
			$addToSet: {
				photos: photoId
			}
		});

		console.log('Photos: insertPhoto', photoId, targetId);

		return photoId;
	},
	removePhoto: function(photoId) {

		var photoData = Photos.findOne(photoId);
		
		if( Photos.remove({_id: photoId, userId: Meteor.userId() }) )
		//user is owner
		{
			Users.update({_id: photoData.userId}, {
				$pull: {photos: photoId}
			});

			if(photoData.targetType==='place')
				Places.update(photoData.targetId, {
					$pull: {
						photos: photoId
					}
				});
		}
			
		console.log('Photos: removePhoto', photoId);
	}
});*/
