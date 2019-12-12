
/**
 * sanitization string methods
 * @namespace
 * @memberOf Util
 */
Kepler.Util.sanitize = {

	text: function(body) {
		body = _.str.stripTags(body);
		body =  _.str.truncate(body, 1024)
		//body = _.escape(body);
		return body;
	},

	regExp: function(text) {
		text = text || '';
		return text
			.replace(/[({[^$\*\.+?\\\]})]/g,'');
	},

	name: function(name, lower) {
		name = name || '';
		if(lower)
			name = name.toLowerCase();
			/*.replace(/_+/g,' ')
			.replace(/-+/g,' ')
			.replace(/’+/g,'\'')
			.replace(/[^a-z0-9\.'\- ]/g,'');*/

		name = _.str.unescapeHTML(name) || '';
		name = _.str.stripTags(name) || '';
		name = _.str.clean(name) || '';

		return name.substr(0, 255);
	},
/*	TODO move code from locRound loc: function(loc) {
		return loc
	},*/

	/**
	 * return same name with added incremental number at tail
	 * @param  {String} name [description]
	 * @param  {String} sep  [description]
	 * @return {String}      [description]
	 */
	nthName: function(name, sep) {
		sep = sep || '';
		var m = name.match(/([^0-9]+)([0-9]+)$/),
			nameo = m ? m[1] : name,
			n2 = m ? parseInt(m[2],10) : 0,
			n = n2 ? ++n2 : 2;
		return nameo + sep + n;
	},

	username: function(name) {
		name = name || '';

		name = Latinize(name);

		name = name.toLowerCase()
			.replace(/’+/g,'\'')
			.replace(/[ ]/g,'.')
			.replace(/[^a-z0-9\.\-_]/g,'')
			.replace(/[\.]{2,}/g,'.')
			.replace(/[\-]{2,}/g,'-');
		name = _.str.clean(name) || '';
		return name.substr(0,16);
	},

	fileName: function(name, trimExt) {
		name = name || '';
		name = trimExt && /\./.test(name)? name.split('.').slice(0, -1).join('.') : name;
		return name.toLowerCase()
			.replace(/ +/g,'_')
			.replace(/[^a-z0-9\\\-\._]/g,'')
			.replace(/\.\./g,'.')
			.replace(/\//g,'');
	},

	fileExt: function(name) {
		name = name || "";
		let parts = name.split('.');
		return (parts.length>1 ? parts.pop() : "").toLowerCase();
	},

	url: function(url) {
		if(url && !url.match(/^[a-zA-Z]+:\/\//))
			url = 'http://'+url;
		return url.toLowerCase();
	}
};