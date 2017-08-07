
Template.popupCursor_edit.events({
	'click .btn-create': function(e,tmpl) {
		Meteor.call('insertPlace', this.loc, function(err, placeId) {

			K.Map.cursor.hide();

			Meteor.subscribe('placeById', placeId, function() {
				
				var place = K.placeById(placeId);
				
				K.Map.addItem( place );

				place.loadPanel();
			});
		});
	},
});