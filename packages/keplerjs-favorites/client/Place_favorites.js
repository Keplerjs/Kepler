
Kepler.Place.include({

	getRank: function() {
		this._dep.depend();
		return this.rank;
	},

	isFavorite: function() {
		this._dep.depend();
		return K.Profile.data && _.contains(K.Profile.data.favorites, this.id);
	}
});