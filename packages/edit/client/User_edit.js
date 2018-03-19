
Kepler.User.include({

	placesList: null,

	loadPlaces: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.placesList)
			cb(self.placesList);
		else
			Meteor.subscribe('placesByIds', self.places, function() {
				
				self.placesList = self.places;

				self._dep.changed();

				cb(self.placesList);
			});
	},

	getPlacesList: function() {
		
		this._dep.depend();

		return this.placesList;
	}
});