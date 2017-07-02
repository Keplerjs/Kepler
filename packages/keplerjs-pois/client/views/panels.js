
Template.panelPlace_pois.events({
	'click .panel-btn-pois': function(e, tmpl) {
		tmpl.data.loadPois(this.type);
	}
});