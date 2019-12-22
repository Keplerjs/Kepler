
Template.panelPlaceEdit_edit_del.onRendered(function() {
	
	var self = this,
		place = this.data;

	self.$('.btn-editdel').btsConfirmButton(function(e) {

		Meteor.call('removePlace', place.id, function(err) {

			if(err)
				console.warn(err.message);
			else
			{
				let p = K.placeById(place.id)
				K.Map.removeItem(p);
				p.marker.remove();
			
				Router.go('map');
				//history.back();
			}
		});
	});

});
