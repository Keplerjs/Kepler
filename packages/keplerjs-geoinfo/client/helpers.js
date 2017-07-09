
Template.registerHelper('sunrise', function(loc) {
	if(!K.Util.valid.loc(loc)) return false;
	return SunCalc.getTimes(new Date(), loc[0], loc[1]).sunrise
			.toLocaleTimeString().match(/([0-9]+):([0-9]+)/)[0];
});

Template.registerHelper('sunset', function(loc) {
	if(!K.Util.valid.loc(loc)) return false;
	return SunCalc.getTimes(new Date(), loc[0], loc[1]).sunset
			.toLocaleTimeString().match(/([0-9]+):([0-9]+)/)[0];
});