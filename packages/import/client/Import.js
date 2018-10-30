
Kepler.Import = {
	
	imports: _.map(_.range(7), function(i) {
		return {
			name: 'place '+i,
			loc: K.Util.geo.randomLoc()
		}
	}),

	importFile: function(fileObj, target, callback) {
	
		var maxFileSize = K.settings.public.upload.maxFileSize;

		if(!fileObj) return false;

		if(this.fileReader)
			this.fileReader.abort();
		else
			this.fileReader = new FileReader();

		
		if( fileObj.size <= maxFileSize && 
			_.contains(['image/png','image/jpeg'], fileObj.type)) {

			this.fileReader.onloadend = function(e) {
				Meteor.call('importFile', {
					name: fileObj.name,
					type: fileObj.type,
					size: fileObj.size,
					blob: e.target.result
				}, target, callback);
			}
			this.fileReader.readAsBinaryString(fileObj);
		}
		else
			callback( i18n('error_imageNotValid') );
		

		return this;
	}
};