
Template.item_place.events({
	'click .place-btn-name': function(e,tmpl) {
		this.loadPanel();
	}
});

Template.place_buttons.events({
	'change .place-btn-checkin': function(e, tmpl) {//MAI USARE CLICK, xke genera due esecuzioni!
		if(e.target.checked)
			Climbo.profile.addCheckin(this.id);
		else
			Climbo.profile.removeCheckin(this.id);
	},
	'change .place-btn-star :checkbox': function(e, tmpl) {//MAI USARE CLICK, xke genera due esecuzioni!
		if(e.target.checked)
			Climbo.profile.addFavorite(this.id);
		else
			Climbo.profile.removeFavorite(this.id);
	},
	'click .place-btn-checkins': function(e,tmpl) {
		this.loadCheckins();
	},
	'click .place-btn-map': function(e, tmpl) {
		this.loadLoc();
	}	
});

Template.place_buttons2.events({
	'click .place-btn-convers': function(e, tmpl) {
		this.loadConvers();
	},
	'click .place-btn-sectors': function(e, tmpl) {
		this.loadSectors();
	},
	'click .place-btn-photos': function(e, tmpl) {
		alert('photos dialog');
	},
	'click .place-btn-share': function(e, tmpl) {
		Session.set('dialogShareId', this.id );
	},	
});
