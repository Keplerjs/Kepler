
Kepler.User.include({

	getCats: function() {
		this._dep.depend();
		return this.cats || [];
	},

	classMarker: function() {
		this._dep.depend();
		return _.map(this.getCats(), function(c) {
			return 'cat-user-'+c;
		}).join(' ');
	}
});