
Template.popupPlace_admin.events({
//	debug actions
	'click .popup-move': function(e,tmpl) {
		
		var self = this;
		
		if(self.marker.draggable) {
			var ll = self.marker.getLatLng(),
				loc = [ll.lat, ll.lng];
			//if(confirm("Aggiornare posizione???"))
				Meteor.call('movePlace', self.id, loc, function(err) {
					self.marker.setLatLng(loc);
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
		Meteor.call('clonePlace', this.id, function(err, placeId) {
			Meteor.subscribe('placeById', placeId, function() {
				var place = K.placeById(placeId);
				K.Map.addItem( place );
				place.showLoc();
			});
		});
	},	
	'click .popup-ren': function(e,tmpl) {
		var self = this;
		//if(confirm("Rinominare?"))
			Meteor.call('renamePlace', this.id, tmpl.$('.popup-reninput').val(), function() {
				self.update();
			});
	}
});