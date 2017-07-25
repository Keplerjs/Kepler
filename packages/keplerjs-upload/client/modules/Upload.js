
Kepler.Upload = {
	uploadFile: function(fileObj, target, callback) {
	
	//TODO implement target redirection

		if(this.fileReader)
			this.fileReader.abort();
		else
			this.fileReader = new FileReader();
			
		if(true || K.Util.valid.image(fileObj)) {
			this.fileReader.onloadend = function(e) {
				Meteor.call('uploadFile', {
					name: fileObj.name,
					type: fileObj.type,
					size: fileObj.size,
					blob: e.target.result
				}, callback);
			}
			this.fileReader.readAsBinaryString(fileObj);
		}
		else
			callback({message: i18n('upload_error_imageNotValid') + K.Util.humanize.filesize(Meteor.settings.public.maxImageSize) });

		return this;
	}
};