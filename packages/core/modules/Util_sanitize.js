
Kepler.Util.sanitize = {

	text: function(body) {
		body = _.str.stripTags(body);
		body = _.str.trim(body);

		//body = _.escape(body);
		//TODO more filter msg
		
		return body;
	},

	regExp: function(text) {
		return text && text.replace(new RegExp("[({[^.$*+?\\\]})]","g"),'');
	},

	name: function(name) {
		name = name || '';
/*		name = name.toLowerCase()
			.replace(/_+/g,' ')
			.replace(/-+/g,' ')
			.replace(/’+/g,'\'')
			.replace(/[^a-z0-9\.'\- ]/g,'');*/

		name = _.str.unescapeHTML(name) || '';
		name = _.str.stripTags(name) || '';
		name = _.str.clean(name) || '';

		return name.substr(0,255);
	},

	username: function(name) {
		name = name || '';

		if(Meteor.isServer && Latinize)
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
		name = trimExt ? name.split('.').slice(0, -1).join('.') : name;
		return name.toLowerCase()
			.replace(/ +/g,'_')
			.replace(/[^a-z0-9\\\-\._]/g,'')
			.replace(/\.\./g,'.')
			.replace(/\//g,'');
	},

	fileExt(name) {
		return (name.split('.').pop()+"").toLowerCase();
	}
};