
Template.itemPlace_favorites.events({
	'click .place-btn-star': function(e, tmpl) {
		if(this.isFavorite())
			K.Profile.removeFavorite(this.id);
		else
			K.Profile.addFavorite(this.id);
	}
});

