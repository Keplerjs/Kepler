
Template.panelPlaceEdit.onRendered(function() {
	
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
			
				Router.go('root');
			}
		});
	});

});

Template.tabUser_edit.events({
	'click .panel-btn-placesList': function(e, tmpl) {

		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');
		
		this.loadPlaces(function() {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});
