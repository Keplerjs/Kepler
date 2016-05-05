
Kepler.upload = {
	avatar: function(fileObj, cb) {
		
		if(this.fileReader)
			this.fileReader.abort();
		else
			this.fileReader = new FileReader();
			
		if(true || K.util.valid.image(fileObj)) {
			this.fileReader.onloadend = function(e) {
				Meteor.call('uploadAvatar', {
					name: fileObj.name,
					type: fileObj.type,
					size: fileObj.size,
					blob: e.target.result
				}, cb);
			}
			this.fileReader.readAsBinaryString(fileObj);
		}
		else
			cb({message: i18n('errors.imageNotValid') + K.util.humanize.filesize(Meteor.settings.public.maxImageSize) });

		return this;
	}
};