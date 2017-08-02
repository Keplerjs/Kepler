
Kepler.Util = {

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

	sanitizeName: function(name) {
		name = name || '';
		name = name.toLowerCase()
			.replace(/_+/g,' ')
			.replace(/-+/g,' ')
			.replace(/’+/g,'\'')
			.replace(/[^a-z0-9\.' ]/g,'')
			.replace(/\//g,'');
		return _.str.clean(name);
	},

	sanitizeFilename: function(name) {
		name = name || '';
		return name.toLowerCase()
			.replace(/ +/g,'_')
			.replace(/[^a-z0-9\\\-\._]/g,'')
			.replace(/\.\./g,'.')
			.replace(/\//g,'');
	},
	
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

	deepExtend: function(target, source) {
		//https://stackoverflow.com/questions/14843815/recursive-deep-extend-assign-in-underscore-js
		//only for plain objects
	    for (var prop in source)
	        if (prop in target)
	           this.deepExtend(target[prop], source[prop]);
	        else
	            target[prop] = source[prop];
	    return target;
	},

	dateUtcToLocal: function(date) {
		var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000),
			offset = date.getTimezoneOffset() / 60,
			hours = date.getHours();

		newDate.setHours(hours - offset);

		return newDate;   
	},

	time: function(date) {
		date = date || new Date();
		return date.getTime();
	},

	timeHash: function(expire) {
		
		expire = expire || 'daily';

		var expires = {
			'hourly':  60*60,
			'daily':   60*60*24*1,
			'weekly':  60*60*24*7,
			'monthly': 60*60*24*30
		};
		return parseInt( K.Util.time() / expires[expire] );
	},

	timeName: function(prefix) {
		prefix = prefix || '';
		var D = new Date(),
			d = D.getDate(),
			m = D.getMonth()+1,
			y = D.getFullYear(),
			today = [d,m,y].join('.');
		return K.Util.sanitizeName(prefix+' '+today);
	},

	isMobile: function() {
		return L ? L.Browser.mobile : false;
	}
};