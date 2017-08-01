
Kepler.Place.include({

	getRank: function() {
		this._dep.depend();
		return this.rank;
	},

	isFavorite: function() {
		return Meteor.user() && _.contains(Meteor.user().favorites, this.id);
	}
});