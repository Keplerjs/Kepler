
Template.panelPlace_photos.onRendered(function() {

	var self = this,
		place = self.data,
		img$ = self.$('.place-photo');
	
	if(self.data) {
		//	https://fengyuanchen.github.io/viewerjs/
		//	hidden.spec.js	test: hide viewer before done	9 months ago	
		img$.viewer({
			navbar: false,
			toolbar: false,
			fullscreen: true,
			//events: hide,ready,show,shown,view,viewed,zoom,zoomed
		});

		place.photo$ = img$;
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

Template.formPhotoNew.helpers({
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

		Meteor.call('removePlacePhoto', place.id, function(err) {
		
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