
Kepler.Upload = {
	
	uploadFile: function(uploadTarget, fileObj, params, callback) {
	
		var sets = K.settings.public.upload;

		if(!fileObj) return false;

		if(this.fileReader)
			this.fileReader.abort();
		else
			this.fileReader = new FileReader();

		if( fileObj.size <= sets.maxFileSize) {

			this.fileReader.onloadend = function(e) {
				fileObj = {
					name: fileObj.name,
					type: fileObj.type,
					size: fileObj.size,
					blob: e.target.result
				};
				Meteor.call('uploadFile', uploadTarget, fileObj, params, callback);
			}
			this.fileReader.readAsBinaryString(fileObj);
			//TODO not work.. this.fileReader.readAsDataURL(fileObj);
		}
		else if(_.isFunction(callback)) {
			callback( i18n('upload_error_filesizeNotValid') + K.Util.humanize.filesize(sets.maxFileSize) );
		}
		
		return this;
	}
};