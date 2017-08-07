
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
	'click .popup-movecanc': function(e,tmpl) {
		$(e.target).hide();
		$(e.target).siblings('.popup-move').text('Move');
		this.marker.drag();
	}
});