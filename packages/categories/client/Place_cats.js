
Kepler.Place.include({

	getCats: function() {
		this._dep.depend();
		return this.cats || [];
	},

	classMarker: function() {
		this._dep.depend();
		return _.map(this.getCats(), function(c) {
			return 'cat-place-'+c.toLowerCase();
		}).join(' ');
	}
});