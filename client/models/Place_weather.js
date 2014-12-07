/*
	class Place with Weather support
*/
Climbo.Place.include({

	cache: {
		weather: null
	},
	
	loadWeather: function() {

		var self = this;

		if(!self.cache.weather)
			Meteor.call('getWeatherByLoc', self.loc, function(err, weather) {

				console.log('getWeatherByLoc',weather);

				if(weather && weather.length>0)
				{
					self.cache.weather = weather;
					self.update();
				}
			});
	}
});