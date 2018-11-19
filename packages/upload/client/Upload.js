
Kepler.Upload = {
	
	uploadFile: function(fileObj, target, callback) {
	
		var maxFileSize = K.settings.public.upload.maxFileSize;

		if(!fileObj) return false;

		if(this.fileReader)
			this.fileReader.abort();
		else
			this.fileReader = new FileReader();

		if( fileObj.size <= maxFileSize) {

			this.fileReader.onloadend = function(e) {
				Meteor.call('uploadFile', {
					//TODO extend fileObj
					name: fileObj.name,
					type: fileObj.type,
					size: fileObj.size,
					blob: e.target.result
				}, target, callback);
			}
			this.fileReader.readAsBinaryString(fileObj);
		}
		else if(_.isFunction(callback)) {
			callback( i18n('upload_error_filesizeNotValid') + K.Util.humanize.filesize(maxFileSize) );
		}
		

		return this;
	}
};