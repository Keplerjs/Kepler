
Kepler.Place.include({
	
	loadStreetView: function() {

		var self = this;

		self.streetview = K.cache.get(self.id, 'streetview');

		if(!self.streetview)
			Meteor.call('getStreetViewById', self.id, function(err, streetview) {

				self.streetview = K.cache.set(self.id, streetview, 'streetview');
				self._dep.changed();
			});
	},
	getStreetView: function() {
		this._dep.depend();
		return this.streetview;
	}
});