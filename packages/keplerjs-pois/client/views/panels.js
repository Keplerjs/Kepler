
Template.panelPlace_pois.events({
	'click .panel-btn-poisList': function(e, tmpl) {
		e.preventDefault();
		this.loadPois();
	},
	'click .panel-btn-poi': function(e, tmpl) {
		e.preventDefault();
		tmpl.data.showPois(this.type);
	}
});