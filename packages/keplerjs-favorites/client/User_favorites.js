
Kepler.User.include({

	favsList: null,

	loadFavorites: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.favsList)
			cb(self.favsList);
		else
			Meteor.subscribe('placesByIds', self.favorites, function() {
				
				self.favsList = self.favorites;

				self._dep.changed();

				cb(self.favsList);
			});
	},

	getFavsList: function() {
		
		this._dep.depend();

		return this.favsList;
	}
});