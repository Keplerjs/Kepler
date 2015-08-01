

Template.panel_weather.helpers({
	weather: function() {
		return this.rData().weather;
	}
});

Template.panel_weather_forecast.onRendered(function() {

	var days$ = this.$('.weather_day');

	days$.eq(1).show();

	this.$('#slider_weather').slider({value: 1, tooltip:'hide'})
		.on('slide', function(e) {
			days$.hide().eq(e.value).show();
		})
		.parent().css({width:'97%'});
});
