
Kepler.Util = {
	
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

	/**
	 * [tmpl description]
	 * @param  {String} str  [description]
	 * @param  {Object} data [description]
	 * @return {String}      [description]
	 */
	tmpl: function(str, data) {
		/*
		origin Leflet.js
		 */
		var templateRe = /\{ *([\w_\-]+) *\}/g;

		return str.replace(templateRe, function (str, key) {
			var value = data[key];

			if (value === undefined) {
				throw new Error('No value provided for variable ' + str);

			} else if (typeof value === 'function') {
				value = value(data);
			}
			return value;
		});	
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
		return K.Util.sanitize.name(prefix+' '+today);
	},

	isMobile: function() {
		return L ? L.Browser.mobile : false;
	}
};