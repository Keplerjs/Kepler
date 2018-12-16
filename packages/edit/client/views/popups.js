
Template.popupCursor_edit.events({
	'click .btn-editinsert': function(e,tmpl) {

		var btn$ = $(e.target),
			icon$ = btn$.find('.icon');
		btn$.addClass('disabled');
		icon$.addClass('icon-loader');

		Meteor.call('insertPlace', {loc: this.loc}, function(err, placeId) {

			btn$.removeClass('disabled');
			icon$.removeClass('icon-loader');

			Meteor.subscribe('placeById', placeId, function() {

				Router.go('panelPlaceEdit', {placeId: placeId});

				K.Map.addItem(K.placeById(placeId));

				K.Map.hideCursor();
			});
		});
	},
});