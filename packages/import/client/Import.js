
Kepler.Import = {
	
	imports: _.map(_.range(7), function(i) {
		return {
			name: 'place '+i,
			loc: K.Util.geo.randomLoc()
		}
	}),

	importFile: function(fileObj, callback) {

		var maxFileSize = K.settings.public.import.maxFileSize,
			formats = [];

		_.each(K.settings.public.import.fileFormats, function(v,k) {
			if(v) {
				formats.push(k);
			}
		});

		if(!fileObj) return false;

		if(this.fileReader)
			this.fileReader.abort();
		else
			this.fileReader = new FileReader();
		
		if( fileObj.size <= maxFileSize && 
			_.contains(formats, fileObj.type)) {

			this.fileReader.onloadend = function(e) {
				Meteor.call('importFile', {
					name: fileObj.name,
					type: fileObj.type,
					size: fileObj.size,
					blob: e.target.result
				}, callback);
			}
			this.fileReader.readAsText(fileObj);
		}
		else
			callback( i18n('error_import_formatNotValid') );
		

		return this;
	}
};