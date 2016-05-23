
Template.place_btns3.events({
	'change .place-btn-checkin :checkbox': function(e, tmpl) {//MAI USARE CLICK, xke genera due esecuzioni!
		if(e.target.checked)
			K.profile.addCheckin(this.id);
		else
			K.profile.removeCheckin(this.id);
	},
	'change .place-btn-star :checkbox': function(e, tmpl) {//MAI USARE CLICK, xke genera due esecuzioni!
		if(e.target.checked)
			K.profile.addFavorite(this.id);
		else
			K.profile.removeFavorite(this.id);
	}
});

Template.item_place_nearby.events({	
	'mouseenter .well': function(e, tmpl) {
		e.preventDefault();
		//this.marker.fire('click')
		this.icon.animate();
	}
});
