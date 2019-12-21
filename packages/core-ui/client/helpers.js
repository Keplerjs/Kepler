
//TODO use namespace K for all global helpers!

Template.registerHelper('version', function(url) {
	return K.version;
});

Template.registerHelper('absoluteUrl', function(url) {
	return Meteor.absoluteUrl(url)
});

Template.registerHelper('settings', function(prop, subprop) {
	var path = _.isString(subprop) ? prop+'.'+subprop : prop;
	return _.isString(prop) ? K.Util.getPath(K.settings.public, path) : K.settings.public;
});

Template.registerHelper('userById', function(id) {
	return K.userById(id);
});

Template.registerHelper('placeById', function(id) {
	return K.placeById(id);
});

Template.registerHelper('routeIs', function(names, classTrue) {
	var cur = Router.current(),
		nn = names.split('|');
	return cur.route && _.contains(nn, cur.route.getName()) ? classTrue : '';
});

Template.registerHelper('routeTitle', function() {
	var cur = Router.current();
	return cur.route && i18n('title_'+ cur.route.getName() );
});

Template.registerHelper('routeParamIs', function(name, val) {
	var cur = Router.current();
	return cur.getParams()[name] === val;
});

Blaze._allowJavascriptUrls();
Template.registerHelper('routeBack', function() {
/* not work always	var cur = Router.current(),
		u = (cur && cur.url),
		p = u.split('/').slice(0,-1).join('/');*/
	return 'javascript:history.back()';
});

Template.registerHelper('connectionStatus', function() {
	return Meteor.status();
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

Template.registerHelper('gt', function (a, b) {
  return a > b;
});

Template.registerHelper('arrayify',function(obj) {
    var result = [];
    for(var k in obj)
    	result.push({key: k, val: obj[k] });
    return result;
});

Template.registerHelper('join', function (arr, sep) {
	arr = _.isArray(arr) ? arr : [];
	sep = _.isString(sep) ? sep : ',';
	return arr.join(sep);
});

Template.registerHelper('humanAzimut', function(ang,code) {
	return K.Util.humanize.azimut(ang, parseInt(code));
});

Template.registerHelper('humanTime', function(sec, ago) {
	return K.Util.humanize.time(sec, parseInt(ago));
});

Template.registerHelper('humanUrl', function(url) {
	return K.Util.humanize.url(url);
});

Template.registerHelper('numericDate', function(date, time) {
	if(!date) return '';
	date = new Date(date);
	var dd = [date.getDate(), date.getMonth()+1, date.getFullYear()].join('/');
	var tt = [date.getHours(),date.getMinutes()].join(':');
	return dd+(time ? ' '+tt : '');
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


/* 
	debugging helpers
*/
Template.registerHelper('log', function(prop) {
	return '<pre class="log">'+JSON.stringify(prop,null,4)+'</pre>';
});

Template.registerHelper('htmlComment', function() {
	var args = _.toArray(arguments);
	args.pop();
	return '<!-- '+args.join(' ')+' -->';
});

Template.registerHelper('randStatus', function(url) {
	var s = ['online','offline','away',
			'mob-online','mob-offline','mob-away'],
		k = _.random(0,s.length-1);
	return s[k];
});

