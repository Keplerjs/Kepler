
Template.panelPlace_photos.onRendered(function() {

		var self = this,
		place = self.data;
	
	var img$ = self.$('.place-photo');

	console.log(img$)

	self.vjs = new Viewer(img$[0], {
		navbar: false,
		toolbar: false,
		fullscreen: true,
		ready: function(e) {
			console.log('start view photo')
		},
		hide: function(e) {
			console.log('stop view photo')	
		}
	});
});

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