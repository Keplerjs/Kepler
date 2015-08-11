/*
Template.panelPlaces.onRendered(function() {
	this.$('.panel-body').masonry({
	  columnWidth: 100,
	  itemSelector: '.place-box'
	});
});
*/
Template.panelPlaces.events({	
	'mouseenter .well': function(e, tmpl) {
		e.preventDefault();
		//this.marker.fire('click')
		this.icon.animate();
	}
});
