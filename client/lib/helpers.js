//https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md
//http://stackoverflow.com/questions/22750022/defining-iterative-block-helpers-in-meteor-0-8


//TODO nuovo helper {{#ifwith }}

UI.registerHelper('or', function() {
	return _.some(_.initial(arguments));
});

UI.registerHelper('newUser', function(id) {
	return Climbo.newUser(id);
});

UI.registerHelper('newPlace', function(id) {
	return Climbo.newPlace(id);
});

///Climbo.util..

UI.registerHelper('cap', function(text) {
	return _.str.capitalize(text);
});

UI.registerHelper('humanAzimut', function(ang, tiny) {
	return Climbo.util.human.azimut(ang, parseInt(tiny));
});

UI.registerHelper('humanTime', function(sec, ago) {
	return Climbo.util.human.time(sec, parseInt(ago));
});

UI.registerHelper('humanTimeUTC', function(dateutc, ago) {
	var date = Climbo.util.dateUtcToLocal(new Date(Date.parse(dateutc))),
		sec = Math.round(date.getTime()/1000);
	return Climbo.util.human.time(sec, parseInt(ago));
});

UI.registerHelper('humanDate', function(date) {
	return Climbo.util.human.date(date);
});

UI.registerHelper('humanDateUTC', function(dateutc) {
	var date = Climbo.util.dateUtcToLocal(new Date(Date.parse(dateutc))),
		d = date.getDate(),
		m = date.getMonth()+1,
		y = date.getFullYear();
	return Climbo.util.human.date(d+'-'+m+'-'+y);
});

UI.registerHelper('humanDistance', function(dis, sign) {
	return Climbo.util.human.distance(dis, parseInt(sign));
});

UI.registerHelper('humanLatlng', function(loc) {
	return Climbo.util.human.latlng(loc);
});

UI.registerHelper('sunrise', function(ll) {
	return Climbo.util.geo.sunrise(ll);
});

UI.registerHelper('sunset', function(ll) {
	return Climbo.util.geo.sunset(ll);
});

UI.registerHelper('placeType', function(type) {
	return i18n('ui.places.'+type) || '';
});

UI.registerHelper('navUrl', function(loc) {
	//REF: https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
	//TODO da cambiare secondo il device

	return "http://maps.apple.com/?ll="+loc.join(',');
});
