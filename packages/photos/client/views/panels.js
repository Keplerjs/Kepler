
Template.panelPlaceEdit_photos.onRendered(function() {
	
	var self = this,
		place = self.data;
	
	self.$('.btn-photodel').btsConfirmButton(function(e) {
		
		console.log(place.id)

		Meteor.call('removePlacePhoto', self.data.id, function(err) {
		
			if(err)
				console.warn(err.message);
			else
				place.update();
		});			
	});
});

Template.panelPlaceEdit_photos.helpers({
	photoUploaded: function() {
		var place = this;
		return function(ret) {
			//TODO or update photo
			place.update();
		}
	}
});