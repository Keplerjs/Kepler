
Template.popupCursor_edit.events({
	'click .btn-editinsert': function(e,tmpl) {

		Meteor.call('insertPlace', {loc: this.loc}, function(err, placeId) {

			Meteor.subscribe('placeById', placeId, function() {

				Router.go('panelEdit', {placeId: placeId});

				var place = K.placeById(placeId);
				
				K.Map.cursor.hide();
				K.Map.addItem( place );
			});
		});
	},
});