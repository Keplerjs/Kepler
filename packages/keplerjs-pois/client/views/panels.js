
Template.panelPlace_pois.events({
	'click .panel-btn-poisList': function(e, tmpl) {

		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');
		
		this.loadPois(function() {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	},
	'click .panel-btn-poi': function(e, tmpl) {
		e.preventDefault();
		tmpl.data.showPois(this.type);
	}
});