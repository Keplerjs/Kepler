
Template.panelPlace_photos.onRendered(function() {

	var self = this,
		place = self.data,
		img$ = self.$('.place-photo');

	//	https://fengyuanchen.github.io/viewerjs/
	if(place.photo && Viewer) {

		if(place.photoViewer)
			place.photoViewer.destroy();

		place.photoViewer = new Viewer(img$[0], {
			navbar: false,
			toolbar: false,
			fullscreen: true,
			/*ready: function(e) {
				console.log('start view photo')
			},
			hide: function(e) {
				console.log('stop view photo')	
			}*/
		});
	
	}
});

Template.panelPlace_photos.helpers({
	photourl: function() {
		return K.settings.public.upload.targets.photos_places.url+ this.photo; 
	}
});

Template.panelPlace_photos.events({
	'click .place-photo': function(e, tmpl) {
		e.preventDefault();
		if(tmpl.data.photoViewer)
			tmpl.data.photoViewer.show();
	}
});

Template.photo_place_new.helpers({
	uploadDone: function() {
		var tmpl = Template.instance();
		return function(placeId) {
			//tmpl.$('.import-text').text(ret)
			//console.log(placeId)
			Router.go('panelPlaceEdit', {placeId: placeId});
		}
	}
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

		//return a callback
		return function(ret) {
			//TODO or update photo
			place.update();
		}
	}
});