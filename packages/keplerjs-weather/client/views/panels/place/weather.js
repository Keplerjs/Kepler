
Template.panelPlace_weather_forecast.onRendered(function() {

	var days$ = this.$('.weather_day');

	days$.eq(1).show();

	this.$('#slider_weather').slider({value: 1, tooltip:'hide'})
		.on('slide', function(e) {
			days$.hide().eq(e.value).show();
		})
		.parent().css({width:'97%'});
});

Template.panelPlace_weather.events({
	'click .place-btn-weather': function(e) {
		e.preventDefault();		
		this.loadWeather();
	}
});