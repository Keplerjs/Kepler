
//TODO use namespace K for all global helpers!

Template.registerHelper('absoluteUrl', function(url) {
	return Meteor.absoluteUrl(url)
});

Template.registerHelper('settings', function(prop, subprop) {
	var path = _.isString(subprop) ? prop+'.'+subprop : prop;
	return K.Util.getPath(K.settings.public, path);
});

Template.registerHelper('userById', function(id) {
	return K.userById(id);
});

Template.registerHelper('placeById', function(id) {
	return K.placeById(id);
});

Template.registerHelper('ifRoute', function(name, classTrue) {
	var cur = Router.current();
	return cur.route && cur.route.getName()===name ? classTrue : '';
});

Template.registerHelper('routeTitle', function() {
	var cur = Router.current();
	return cur.route && i18n('title_'+ cur.route.getName() );
});

Template.registerHelper('connectionStatus', function() {
	return Meteor.status();
});

Template.registerHelper('stringify', function(prop) {
	return '<pre>'+JSON.stringify(prop,null,4)+'</pre>';
});

Template.registerHelper('htmlComment', function() {
	var args = _.toArray(arguments);
	args.pop();
	return '<!-- '+args.join(' ')+' -->';
});

Template.registerHelper('or', function() {
	return _.some(_.initial(arguments));
});

Template.registerHelper('and', function() {
	return _.every(_.initial(arguments));
});

Template.registerHelper('eq', function (a, b) {
  return a === b;
});

Template.registerHelper('arrayify',function(obj){
    var result = [];
    for(var k in obj)
    	result.push({key: k, val: obj[k] });
    return result;
});

Template.registerHelper('humanAzimut', function(ang,code) {
	console.log(code)
	return K.Util.humanize.azimut(ang, parseInt(code));
});

Template.registerHelper('humanTime', function(sec, ago) {
	return K.Util.humanize.time(sec, parseInt(ago));
});

Template.registerHelper('numericDate', function(date) {
	if(!date) return '';
	date = new Date(date);
	return [date.getDate(), date.getMonth()+1, date.getFullYear()].join('/');
});

Template.registerHelper('humanDate', function(date, short) {
	return K.Util.humanize.date(date, short);
});

Template.registerHelper('humanDistance', function(dis, sign) {
	return K.Util.humanize.distance(dis, parseInt(sign));
});

Template.registerHelper('humanLoc', function(loc, pre) {
	return K.Util.humanize.loc(loc, parseInt(pre));
});
