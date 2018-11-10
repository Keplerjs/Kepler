
Template.tabUser_favorites.events({
	'click .panel-btn-favsList': function(e, tmpl) {

		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');
		
		this.loadFavorites(function() {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});