
var fs = Npm.require('fs');

var CHMOD = 0755;

Meteor.startup(function() {

	if(K.settings.upload && K.settings.upload.targets) {
		_.each(K.settings.upload.targets, function(conf, name) {
			if(conf && !_.isEmpty(conf.path)) {
				if(!fs.existsSync(conf.path)) {
					console.log("Upload: create target path ", conf.path);
					fs.mkdirSync(conf.path, CHMOD);
				}
			}
			else
				console.warn("Upload: need to define 'path' or 'method' in upload.targets."+name+" on your settings.json");
		});
	}
	else
		console.warn("Upload: need to define path in upload.targets on your settings.json");	
});


Meteor.methods({
	
	uploadFile: function(fileObj, target) {

		if(!this.userId) return null;

		var sets = K.settings.upload.targets[target];

		if(!sets) {
			throw new Meteor.Error(500, i18n('upload_error_targetNotValid'));
			return null;
		}

		fileObj.size = Buffer.byteLength(fileObj.blob, 'binary');

		if(fileObj.size > K.settings.public.upload.maxFileSize) {
			console.log('Upload: error ', _.omit(fileObj,'blob') );
			throw new Meteor.Error(500, i18n('upload_error_filesizeNotValid') + K.Util.humanize.filesize(K.settings.public.upload.maxFileSize) );
			return null;
		}
		
		if(sets.method) {
			//TODO check method exits
			if(sets.maxFileSize && fileObj.size > sets.maxFileSize) {
				console.log('Upload: error ', _.omit(fileObj,'blob') );
				throw new Meteor.Error(500, i18n('upload_error_filesizeNotValid') + K.Util.humanize.filesize(K.settings.public.upload.maxFileSize) );
				return null;
			}
			return Meteor.call(sets.method, fileObj, sets);
		}
		else if(sets.path && sets.url) {
			
			var fileName = K.Util.sanitize.filename(fileObj.name+'_'+ K.Util.time()),
				fileOut = fileName + '.ori.jpg';

			console.log('Upload: file created ', sets.path+fileOut);

			fs.writeFileSync(sets.path + fileOut, fileObj.blob, 'binary');
			fs.chmodSync(sets.path + fileOut, CHMOD);

			console.log('Upload: url ', sets.url+fileOut );
			
			return sets.url + fileOut;

		}
	}
});