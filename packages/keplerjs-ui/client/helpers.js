
/*
//TODO
Template.registerHelper('hideSidebar', function(prop) {
	return Session.get('hideSidebar');
});
*/
Template.registerHelper('absoluteUrl', function(url) {
	return Meteor.absoluteUrl(url)
});

Template.registerHelper('settings', function(prop) {
	return K.Util.getPath(K.settings.public, prop);
});

Template.registerHelper('pluginLoaded', function(name) {
	return !!K.plugins[name];
});

Template.registerHelper('userById', function(id) {
	return K.userById(id);
});

Template.registerHelper('placeById', function(id) {
	return K.placeById(id);
});

Template.registerHelper('isRoute', function(name, clas) {
	var cur = Router.current();
	return cur.route && cur.route.getName()===name ? clas:'';
});

Template.registerHelper('routeTitle', function() {
	var cur = Router.current();
	return cur.route && i18n('title_'+ cur.route.getName() );
});

Template.registerHelper('connectionStatus', function() {
	return Meteor.status();
});

Template.registerHelper('or', function() {
	return _.some(_.initial(arguments));
});

Template.registerHelper('humanAzimut', function(ang) {
	return K.Util.humanize.azimut(ang);
});

Template.registerHelper('humanTime', function(sec, ago) {
	return K.Util.humanize.time(sec, parseInt(ago));
});

Template.registerHelper('humanDate', function(date) {
	return K.Util.humanize.date(date);
});

Template.registerHelper('humanDateUTC', function(dateutc) {
	var date = new Date(dateutc),
		d = date.getDate(),
		m = date.getMonth()+1,
		y = date.getFullYear(),
		dmy = d+'-'+m+'-'+y;
	return K.Util.humanize.date(dmy);
});

Template.registerHelper('humanDistance', function(dis, sign) {
	return K.Util.humanize.distance(dis, parseInt(sign));
});

Template.registerHelper('humanLoc', function(loc, pre) {
	return K.Util.humanize.loc(loc, parseInt(pre));
});

Template.registerHelper('stringify', function(prop) {
	return JSON.stringify(prop,null,4);
});