
Kepler.Upload = {
	
	uploadFile: function(target, fileObj, params, callback) {

		callback = _.isFunction(callback) ? callback : function(){};

		var sets = K.settings.public.upload.targets[target];
		
		sets.maxFileSize = sets.maxFileSize || K.settings.public.upload.maxFileSize

		if(!fileObj) return false;

		if(fileObj.size > sets.maxFileSize) {
			callback( i18n('upload_error_filesizeNotValid') + 
				K.Util.humanize.filesize(sets.maxFileSize) );
			return this;
		}

		if(_.isObject(sets.mimeFileType)) {
			var mimes = [];
			_.each(sets.mimeFileType, function(v,k) {
				if(v===true)
					mimes.push(k);
			});
			
			if(!_.contains(mimes, fileObj.type)) {
				callback( i18n('upload_error_formatNotValid') );
				return null;
			}
		}

		if(this.fileReader)
			this.fileReader.abort();
		else
			this.fileReader = new FileReader();
		
		this.fileReader.onloadend = function(e) {
			fileObj = {
				name: fileObj.name,
				type: fileObj.type,
				size: fileObj.size,
				blob: e.target.result
			};
			Meteor.call('uploadFile', target, fileObj, params, callback);
		};
		this.fileReader.readAsBinaryString(fileObj);
		//TODO not work.. this.fileReader.readAsDataURL(fileObj);
		
		return this;
	}
};