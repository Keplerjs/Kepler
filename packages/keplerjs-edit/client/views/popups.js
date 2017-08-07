
Template.popupCursor_edit.events({
	'click .btn-editinsert': function(e,tmpl) {

		console.log('insert',this, tmpl.data)

		Meteor.call('insertPlace', {loc: this.loc}, function(err, placeId) {

			Meteor.subscribe('placeById', placeId, function() {

				Router.go('panelPlaceEdit', {placeId: placeId});

				var place = K.placeById(placeId);
				
				K.Map.cursor.hide();
				K.Map.addItem( place );
			});
		});
	},
});