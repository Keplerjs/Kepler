
Climbo.util = {
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
		return name.toLowerCase()
			.replace(/[^a-z0-9\\\-\._]/g,'')
			.replace(/\.\./g,'.')
			.replace(/\//g,'');
	},

	timeUnix: function() {
	// 	//http://ikeif.net/2009/04/23/javascript-equivalent-php-time-unix-format/
	// 	return parseInt(new Date().getTime().toString().substring(0, 10));
		return Math.round(new Date().getTime()/1000);
	},
	
	dateUtcToLocal: function(date) {
		var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000),
			offset = date.getTimezoneOffset() / 60,
			hours = date.getHours();

		newDate.setHours(hours - offset);

		return newDate;   
	}
};