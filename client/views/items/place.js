
Template.place_btns3.events({
	'change .place-btn-checkin :checkbox': function(e, tmpl) {//MAI USARE CLICK, xke genera due esecuzioni!
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
	}
});

