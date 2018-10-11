
Kepler.Place.include({

	getCats: function() {
		this._dep.depend();
		return this.cats || [];
	},

	addCats: function(cats) {
		Meteor.call('addCatsToPlace', this.id, cats, function(err, cats) {
			console.log('addCatsToPlace',err,cats);
		});
	},
	
	removeCats: function(cats) {
		Meteor.call('addCatsToPlace', this.id, cats, function(err, cats) {
			console.log('addCatsToPlace',err,cats);
		});
	}
});