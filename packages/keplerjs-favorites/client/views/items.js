
Template.itemPlace_favorites.events({
	'change .place-btn-star :checkbox': function(e, tmpl) {//MAI USARE CLICK, xke genera due esecuzioni!
		if(e.target.checked)
			K.Profile.addFavorite(this.id);
		else
			K.Profile.removeFavorite(this.id);
	}
});

		