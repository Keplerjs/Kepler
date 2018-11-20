

Meteor.methods({
	
	insertPlacePhotos: function(fileObj, sets) {
		return Meteor.call('exifPhoto', fileObj, sets);
	}
});