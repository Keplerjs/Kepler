
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
