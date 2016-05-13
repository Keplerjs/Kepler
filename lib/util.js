
Kepler.util = {
	//http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
	getPath: function(obj, prop) {
		var parts = prop ? prop.split('.') : [],
			last = parts.pop(),
			len = parts.length,
			cur = parts[0],
			i = 1;

		if(len > 0)
			while((obj = obj[cur]) && i < len)
				cur = parts[i++];

		if(obj)
			return obj[last];
	},

	sanitizeMsg: function(body) {
		body = _.str.stripTags(body);
		body = _.str.trim(body);

		//body = _.escape(body);
		//TODO more filter msg
		
		return body;
	},

	sanitizeRegExp: function(text) {
		return text && text.replace(new RegExp("[({[^.$*+?\\\]})]","g"),'');
	},

	sanitizeFilename: function(name) {
		name = name || '';
		return name.toLowerCase()
			.replace(/ +/g,'_')
			.replace(/[^a-z0-9\\\-\._]/g,'')
			.replace(/\.\./g,'.')
			.replace(/\//g,'');
	},

	dateUtcToLocal: function(date) {
		var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000),
			offset = date.getTimezoneOffset() / 60,
			hours = date.getHours();

		newDate.setHours(hours - offset);

		return newDate;   
	},

	timeUnix: function() {
	// 	//http://ikeif.net/2009/04/23/javascript-equivalent-php-time-unix-format/
	// 	return parseInt(new Date().getTime().toString().substring(0, 10));
		return Math.round(new Date().getTime()/1000);
	},

	hashGen: function(expire) {
		//TODO move to K.cache module
		
		expire = expire || 'daily';

		var expires = {
			'hourly':  60*60,
			'daily':   60*60*24*1,
			'weekly':  60*60*24*7,
			'monthly': 60*60*24*30
		};
		return parseInt( K.util.timeUnix() / expires[expire] );
	}
};