Template.popup_place.events({
//	debug actions
	'click .popup-move': function(e,tmpl) {
		
		var self = this;

		if(self.marker.draggable) {
			var ll = self.marker.getLatLng(),
				newLoc = [ll.lat, ll.lng];
			if(confirm("Aggiornare posizione???"))
				Meteor.call('updatePlaceLoc', self.id, newLoc, function(err) {
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
		Meteor.call('clonePlace', this.id, function(err, newPlaceId) {
			Meteor.subscribe('placeByIds', [newPlaceId], function() {	//carica tutti i dati della place
				K.map.addItem( K.newPlace(newPlaceId) );
			});
		});
	},	
	'click .popup-del': function(e,tmpl) {
		var self = this;
		if(confirm("Eliminare?"))
			Meteor.call('delPlace', self.id, function(err) {
				K.map.removeItem(self);
			});
	},
	'click .popup-ren': function(e,tmpl) {
		var self = this;
		if(confirm("Rinominare?"))
			Meteor.call('renamePlace', this.id, tmpl.$('.popup-reninput').val(), function() {
				self.update();
			});
	}
});