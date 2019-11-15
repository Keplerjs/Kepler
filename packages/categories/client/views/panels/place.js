
Template.itemPlaceCats.events({
	'click .place-btn-map': function(e, tmpl) {
		e.preventDefault()
		this.showLoc();
	}
});