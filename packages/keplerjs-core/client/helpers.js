
/*
//TODO
Template.registerHelper('hideSidebar', function(prop) {
	return Session.get('hideSidebar');
});
*/

Template.registerHelper('settings', function(prop) {
	return K.Util.getPath(Meteor.settings.public, prop);
});

Template.registerHelper('userById', function(id) {
	return K.userById(id);
});

Template.registerHelper('placeById', function(id) {
	return K.placeById(id);
});

Template.registerHelper('placeType', function(type) {
	return i18n('places.'+type) || '';
});

Template.registerHelper('isRoute', function(name, clas) {
	return Router.current().route.getName()===name ? clas:'';
});

Template.registerHelper('routeTitle', function() {
	return i18n('titles.'+ Router.current().route.getName() );
});

Template.registerHelper('connectionStatus', function() {
	return Meteor.status();
});

Template.registerHelper('or', function() {
	return _.some(_.initial(arguments));
});

Template.registerHelper('humanAzimut', function(ang, tiny) {
	return K.Util.humanize.azimut(ang, parseInt(tiny));
});

Template.registerHelper('humanTime', function(sec, ago) {
	return K.Util.humanize.time(sec, parseInt(ago));
});

Template.registerHelper('humanTimeUTC', function(dateutc, ago) {
	var date = K.Util.dateUtcToLocal(new Date(Date.parse(dateutc))),
		sec = Math.round(date.getTime()/1000);
	return K.Util.humanize.time(sec, parseInt(ago));
});

Template.registerHelper('humanDate', function(date) {
	return K.Util.humanize.date(date);
});

Template.registerHelper('humanDateUTC', function(dateutc) {
	var date = K.Util.dateUtcToLocal(new Date(Date.parse(dateutc))),
		d = date.getDate(),
		m = date.getMonth()+1,
		y = date.getFullYear();
	return K.Util.humanize.date(d+'-'+m+'-'+y);
});

Template.registerHelper('humanDistance', function(dis, sign) {
	return K.Util.humanize.distance(dis, parseInt(sign));
});

Template.registerHelper('humanLatlng', function(loc) {
	return K.Util.humanize.latlng(loc);
});