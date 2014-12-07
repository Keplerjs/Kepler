
Template.tab_streetview.events({
	'click .place-btn-stview': function(e) {
		e.preventDefault();		
		this.loadStreetView();
	}
});