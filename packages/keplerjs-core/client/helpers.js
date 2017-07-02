
Template.registerHelper('settings', function(prop) {
	return K.util.getPath(Meteor.settings.public, prop);
});

Template.registerHelper('pluginsTemplates', function () {

  	var parentTemplate = Template.instance().view.name.replace('Template.','');
	
	return _.map(K.plugins.getPlugins(), function(plugin) {
		if(Template[parentTemplate+'_'+plugin.name])
			return {
				pluginTemplate: parentTemplate+'_'+plugin.name,
				pluginData: Template.currentData()
			};
	});
});

Template.registerHelper('isRoute', function(name, clas) {
	return K.router.routeName()===name ? clas:'';
});

Template.registerHelper('routeTitle', function() {
	return i18n('titles.'+ K.router.routeName() );
});

Template.registerHelper('connectionStatus', function() {
	return Meteor.status();
});

Template.registerHelper('or', function() {
	return _.some(_.initial(arguments));
});

Template.registerHelper('newUser', function(id) {
	return K.newUser(id);
});

Template.registerHelper('newPlace', function(id) {
	return K.newPlace(id);
});

Template.registerHelper('humanAzimut', function(ang, tiny) {
	return K.util.humanize.azimut(ang, parseInt(tiny));
});

Template.registerHelper('humanTime', function(sec, ago) {
	return K.util.humanize.time(sec, parseInt(ago));
});

Template.registerHelper('humanTimeUTC', function(dateutc, ago) {
	var date = K.util.dateUtcToLocal(new Date(Date.parse(dateutc))),
		sec = Math.round(date.getTime()/1000);
	return K.util.humanize.time(sec, parseInt(ago));
});

Template.registerHelper('humanDate', function(date) {
	return K.util.humanize.date(date);
});

Template.registerHelper('humanDateUTC', function(dateutc) {
	var date = K.util.dateUtcToLocal(new Date(Date.parse(dateutc))),
		d = date.getDate(),
		m = date.getMonth()+1,
		y = date.getFullYear();
	return K.util.humanize.date(d+'-'+m+'-'+y);
});

Template.registerHelper('humanDistance', function(dis, sign) {
	return K.util.humanize.distance(dis, parseInt(sign));
});

Template.registerHelper('humanLatlng', function(loc) {
	return K.util.humanize.latlng(loc);
});

Template.registerHelper('sunrise', function(ll) {
	return K.util.geo.sunrise(ll);
});

Template.registerHelper('sunset', function(ll) {
	return K.util.geo.sunset(ll);
});

Template.registerHelper('placeType', function(type) {
	return i18n('places.'+type) || '';
});
