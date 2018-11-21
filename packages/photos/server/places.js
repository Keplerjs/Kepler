

Meteor.methods({
	
	insertPlacePhotos: function(fileObj, sets) {

		var url = Meteor.call('resizePhoto', fileObj, sets);

		var exif = Meteor.call('exifPhoto', fileObj, sets);

		return {
			url: url,
			loc: exif.loc
		};
	}
});