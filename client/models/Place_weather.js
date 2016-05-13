
Kepler.Place.include({
	
	loadWeather: function() {

		var self = this;

		self.weather = K.cache.get(self.loc, 'weather');

		if(!self.weather)
			Meteor.call('getWeatherByLoc', self.loc, function(err, weather) {

				self.weather = K.cache.set(self.loc, weather, 'weather');
				self._dep.changed();
			});
	},
	getWeatherList: function() {
		this._dep.depend();
		return this.weather;
	}
});