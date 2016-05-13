/*
	class Place with Weather support
*/
Kepler.Place.include({
	
	loadWeather: function() {

		var self = this;

		self.weather = K.cache.get(self.loc, 'weather');

		if(!self.weather)
			Meteor.call('getWeatherByLoc', self.loc, function(err, weather) {

				console.log('getWeatherByLoc', weather);

				self.weather = K.cache.set(self.loc, weather, 'weather');
			});
	},
	getWeatherList: function() {

		return this.weather;
	}
});