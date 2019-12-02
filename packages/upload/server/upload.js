
var fs = Npm.require('fs');

var CHMOD = 0755;

Meteor.startup(function() {

	if(K.settings.upload && K.settings.upload.targets) {
		_.each(K.settings.upload.targets, function(conf, name) {
			if(conf && !_.isEmpty(conf.path)) {
				if(!fs.existsSync(conf.path)) {
					console.log("Upload: create path ", conf.path, " for target ", name);

					try {
						fs.mkdirSync(conf.path, CHMOD);
					}
					catch(e) {
						console.warn('Upload: error to create path "'+conf.path+'"');
					}
				}
			}
			else if(_.isEmpty(conf.path) && _.isEmpty(conf.method))
				console.warn("Upload: need to define 'path' or 'method' param in upload.targets."+name+", add to your settings.json");
		});
	}
	else
		console.warn("Upload: need to define path in upload.targets on your settings.json");	
});


Meteor.methods({
	
	uploadFile: function(target, fileObj, params) {
		
		if(!this.userId) return null;

		if(!K.settings.upload.targets[target]) {
			throw new Meteor.Error(500, i18n('error_upload_targetNotValid'));
			return null;
		}

		var sets = _.extend({},
				K.settings.upload.targets[target],
				K.settings.public.upload.targets[target]
			);

		fileObj.size = Buffer.byteLength(fileObj.blob, 'binary');
		fileObj.ext = K.Util.sanitize.fileExt(fileObj.name);

		if(fileObj.size > sets.maxFileSize) {
			console.log('Upload: error size', target, _.omit(fileObj,'blob') );
			throw new Meteor.Error(500, i18n('error_upload_filesizeNotValid') + K.Util.humanize.filesize(K.settings.public.upload.maxFileSize) );
			return null;
		}
		
		//TODO use https://github.com/jshttp/mime-types
		// or https://github.com/jshttp/mime-db
		if(_.isObject(sets.mimeFileType)) {
			var mimes = [];
			_.each(sets.mimeFileType, function(v,k) {
				if(v===true)
					mimes.push(k);
			});
			
			if(!_.contains(mimes, fileObj.type)) {
				console.log('Upload: error format', fileObj.type );
				throw new Meteor.Error(500, i18n('error_upload_formatNotValid'));
				return null;
			}
		}

		if(sets.method) {
			//TODO check method exits
			console.log('Upload: pass file to method ', sets.method);

			return Meteor.call(sets.method, fileObj, params, sets);
		}
		else if(sets.path) {
			
			var fileName = K.Util.sanitize.fileName(fileObj.name+'_'+ K.Util.time()),
				fileOut = fileName+'.'+fileObj.ext;

			console.log('Upload: file created ', sets.path+fileOut);

			try {
				fs.writeFileSync(sets.path + fileOut, fileObj.blob, 'binary');
				fs.chmodSync(sets.path + fileOut, CHMOD);
			}
			catch(e) {
				console.warn('Upload: error to create file "'+sets.path+fileOut+'"');
			}

			console.log('Upload: uploadFile ', fileOut);
			
			return fileOut;

		}
	}
});