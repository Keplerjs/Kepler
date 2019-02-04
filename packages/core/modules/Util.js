/** @namespace */
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
	},

	textToColor: function(str) {
		//https://stackoverflow.com/questions/17845584/converting-a-random-string-into-a-hex-colour
		this.color_codes = {};
	    return (str in this.color_codes) ? this.color_codes[str] : (this.color_codes[str] = '#'+ ('000000' + (Math.random()*0xFFFFFF<<0).toString(16)).slice(-6));
	},

	randomString(len) {
		len = len || 6;
		return Math.random().toString(36).substr(2, len);
	}
	/**
	 * BKDR Hash (modified version)
	 *
	 * @param {String} str string to hash
	 * @returns {Number}
	 */
/*	bkdrHash: function(str) {
	    var seed = 131;
	    var seed2 = 137;
	    var hash = 0;
	    // make hash more sensitive for short string like 'a', 'b', 'c'
	    str += 'x';
	    // Note: Number.MAX_SAFE_INTEGER equals 9007199254740991
	    var MAX_SAFE_INTEGER = parseInt(9007199254740991 / seed2);
	    for(var i = 0; i < str.length; i++) {
	        if(hash > MAX_SAFE_INTEGER) {
	            hash = parseInt(hash / seed2);
	        }
	        hash = hash * seed + str.charCodeAt(i);
	    }
	    return hash;
	}*/
};