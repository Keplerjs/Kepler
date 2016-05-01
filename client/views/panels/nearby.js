
Template.panelNearby.events({	
	'mouseenter .well': function(e, tmpl) {
		e.preventDefault();
		//this.marker.fire('click')
		this.icon.animate();
	}
});
