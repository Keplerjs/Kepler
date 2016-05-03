Template.popup_place.events({
//	debug actions
	'click .popup-move': function(e,tmpl) {
		
		var self = this;

		if(self.marker.draggable) {
			var ll = self.marker.getLatLng(),
				newLoc = [ll.lat, ll.lng];
			if(confirm("Aggiornare posizione???"))
				Meteor.call('adminUpdatePlaceLoc', self.id, newLoc, function(err) {
					self.marker.setLatLng(newLoc);
				});
			
			$(e.target).text('Move');
			$(e.target).siblings('.popup-canc').hide();
		}
		else
		{
			$(e.target).text('Save');
			$(e.target).siblings('.popup-canc').show();
		}

		self.marker.drag();
	},
	'click .popup-canc': function(e,tmpl) {
		$(e.target).hide();
		$(e.target).siblings('.popup-move').text('Move');
		this.marker.drag();
	},	
	'click .popup-clone': function(e,tmpl) {
		Meteor.call('adminClonePlace', this.id, function(err, newPlaceId) {
			Meteor.subscribe('placeByIds', [newPlaceId], function() {	//carica tutti i dati della place
				var place = K.newPlace(newPlaceId);//.loadLoc();
				K.map.loadItem(place)
			});
		});
	},	
	'click .popup-del': function(e,tmpl) {
		var self = this,
			ret = confirm("Eliminare?");
		if(ret) {
			Meteor.call('adminDelPlace', self.id, function(err) {
				self.hideMarker();
			});
		}
	},
	'click .popup-rename': function(e,tmpl) {
		var ret = confirm("Rinominare?");

		if(ret) {
			Meteor.call('adminRenamePlace', this.id, e.target.value);
		}
	}
});