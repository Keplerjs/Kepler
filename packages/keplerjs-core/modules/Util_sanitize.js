
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
		name = name.toLowerCase()
			.replace(/_+/g,' ')
			.replace(/-+/g,' ')
			.replace(/’+/g,'\'')
			.replace(/[^a-z0-9\.' ]/g,'')
			.replace(/\//g,'');
		return _.str.clean(name);
	},

	filename: function(name) {
		name = name || '';
		return name.toLowerCase()
			.replace(/ +/g,'_')
			.replace(/[^a-z0-9\\\-\._]/g,'')
			.replace(/\.\./g,'.')
			.replace(/\//g,'');
	}
};