
//TODO
Meteor.methods({
	updateAvatar: function(fileObj, sets) {

		//TODO move fs.writeFileSync from photos.js to here
		//TODO accept two files

		if(!this.userId) return null;

		var mimes = [];
		_.each(sets.mimeFileType, function(v,k) {
			if(v===true)
				mimes.push(k);
		});
		
		if(!_.contains(mimes, fileObj.type)) {
			console.log('Upload: error ', _.omit(fileObj,'blob') );
			throw new Meteor.Error(500, i18n('upload_error_imageNotValid') );
			return null;
		}

		var url = Meteor.call('resizePhoto', fileObj, sets);
		
		if(url) {
			Users.update(this.userId, {
				$set: {
					avatar: url
				}
			});
		}

		return url;
	}
});
