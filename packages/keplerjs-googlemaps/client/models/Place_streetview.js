
Kepler.Place.include({
	
	loadStreetView: function() {

		var self = this;

		self.streetview = K.Cache.get(self.id, 'streetview');

		if(!self.streetview)
			Meteor.call('findStreetViewById', self.id, function(err, streetview) {

				self.streetview = K.Cache.set(self.id, streetview, 'streetview');
				self._dep.changed();
			});
	},
	getStreetView: function() {
		this._dep.depend();
		return this.streetview;
	}
});