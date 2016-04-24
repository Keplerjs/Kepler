//https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md
//http://stackoverflow.com/questions/22750022/defining-iterative-block-helpers-in-meteor-0-8

Template.registerHelper('isActiveRoute', function(name) {
	return Router.current().route.getName()===name ? 'active':'';
});

Template.registerHelper('connectionStatus', function() {
	return Meteor.status();
});

Template.registerHelper('settings', function(prop) {
	return Climbo.util.getPath(Meteor.settings.public, prop);
});

//TODO nuovo helper {{#ifwith }}
Template.registerHelper('or', function() {
	return _.some(_.initial(arguments));
});

Template.registerHelper('newUser', function(id) {
	return Climbo.newUser(id);
});

Template.registerHelper('newPlace', function(id) {
	return Climbo.newPlace(id);
});

///Climbo.util..

Template.registerHelper('humanAzimut', function(ang, tiny) {
	return Climbo.util.human.azimut(ang, parseInt(tiny));
});

Template.registerHelper('humanTime', function(sec, ago) {
	return Climbo.util.human.time(sec, parseInt(ago));
});

Template.registerHelper('humanTimeUTC', function(dateutc, ago) {
	var date = Climbo.util.dateUtcToLocal(new Date(Date.parse(dateutc))),
		sec = Math.round(date.getTime()/1000);
		console.log(date, ago)
	return Climbo.util.human.time(sec, parseInt(ago));
});

Template.registerHelper('humanDate', function(date) {
	return Climbo.util.human.date(date);
});

Template.registerHelper('humanDateUTC', function(dateutc) {
	var date = Climbo.util.dateUtcToLocal(new Date(Date.parse(dateutc))),
		d = date.getDate(),
		m = date.getMonth()+1,
		y = date.getFullYear();
	return Climbo.util.human.date(d+'-'+m+'-'+y);
});

Template.registerHelper('humanDistance', function(dis, sign) {
	return Climbo.util.human.distance(dis, parseInt(sign));
});

Template.registerHelper('humanLatlng', function(loc) {
	return Climbo.util.human.latlng(loc);
});

Template.registerHelper('sunrise', function(ll) {
	return Climbo.util.geo.sunrise(ll);
});

Template.registerHelper('sunset', function(ll) {
	return Climbo.util.geo.sunset(ll);
});

Template.registerHelper('placeType', function(type) {
	return i18n('ui.places.'+type) || '';
});
