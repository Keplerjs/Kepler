/**
 * @namespace
 * @memberOf Kepler
 */
Kepler.Util = {
	
	//http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
	/**
	 * return sub property of object by path string
	 * @param  {Object} obj  [description]
	 * @param  {String} path [description]
	 * @return {Object}      [description]
	 */
	getPath: function(obj, path) {
		var parts = path ? path.split('.') : [],
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
	 * set sub property of object by path string
	 * @param  {Object} obj  [description]
	 * @param  {String} path [description]
	 * @param  {String} value [description]
	 * @return {Object}      [description]
	 */
	setPath: function(obj, path, value) {
		//inspired by https://medium.com/data-scraper-tips-tricks/safely-read-write-in-deeply-nested-objects-js-a1d9ddd168c6

		var properties = _.isArray(path) ? path : path.split(".");

		// Not yet at the last property so keep digging
		if (properties.length > 1) {
		// The property doesn't exists OR is not an object (and so we overwritte it) so we create it
		if (!obj.hasOwnProperty(properties[0]) || typeof obj[properties[0]] !== "object") obj[properties[0]] = {}
		  // We iterate.
		return K.Util.setPath(obj[properties[0]], properties.slice(1), value)
		  // This is the last property - the one where to set the value
		} else {
			// We set the value to the last property
			obj[properties[0]] = value
			return true // this is the end
		}
	},
	/**
	 * minimal template function
	 * @param  {String} str  [description]
	 * @param  {Object} data [description]
	 * @return {String}      [description]
	 */
	tmpl: function(str, data, double) {
		/*
		origin Leflet.js
		 */
		double = double || false;

		var regSingle = /\{ *([\w_\-]+) *\}/g,
			regDouble = /\{\{ *([\w_\-]+) *\}\}/g,
			tmplReg = double ? regDouble :regSingle;

		return str.replace(tmplReg, function (str, key) {
			var value = data[key];

			if (value === undefined) {
				throw new Error('No value provided for variable ' + str);

			} else if (typeof value === 'function') {
				value = value(data);
			}
			return value;
		});	
	},

	/**
	 * return only valoried keys
	 * @param  {[type]} obj [description]
	 * @return {[type]}     [description]
	 */
	sets: function(obj) {
		var kk = [];
		for(let k in obj)
			if(!!obj[k])
				kk.push(k);
		return _.pick(obj, _.uniq(kk));
	},

	dateUtcToLocal: function(date) {
		var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000),
			offset = date.getTimezoneOffset() / 60,
			hours = date.getHours();

		newDate.setHours(hours - offset);

		return newDate;   
	},
	/**
	 * return numeric current unix timestamp
	 * @param  {Date} date [description]
	 * @return {Number}      [description]
	 */
	time: function(date) {
		date = date || new Date();
		return date.getTime();
	},
	/**
	 * return string name current unix timestamp
	 * @param  {[type]} prefix [description]
	 * @return {[type]}        [description]
	 */
	timeName: function(prefix, sep) {
		prefix = prefix || '';
		sep = sep || '';
		var mm = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
			D = new Date(),
			d = D.getDate(),
			m = mm.split(',')[D.getMonth()+1],
			y = D.getFullYear(),
			dd = d > 9 ? d : '0'+d,
			today = [dd,m,y].join(sep);
		return K.Util.sanitize.name(prefix+today)
	},

	isMobile: function() {
		return L ? L.Browser.mobile : false;
	},
	/**
	 * convert any string in a random html color
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	textToColor: function(str) {
		str = '-'+str;
		//https://stackoverflow.com/questions/17845584/converting-a-random-string-into-a-hex-colour
		this.color_codes = {};
	    return (str in this.color_codes) ? this.color_codes[str] : (this.color_codes[str] = '#'+ ('000000' + (Math.random()*0xFFFFFF<<0).toString(16)).slice(-6));
	},
	/**
	 * transform json or literal object into a nested ul list
	 * @param  {Object} json json string or literal object
	 * @return {String}      return html ul li
	 */
	json2html: function(json, func) {
		var obj = _.isString(json) ? JSON.parse(json) : json,
			list = '<ul style="list-style:none">';

		if(_.isObject(obj)) {
			for (const key in obj) {
				let val = obj[key];
				if (obj.hasOwnProperty(key)) {

					if(_.isObject(val)) {
						val = K.Util.json2html(val, func);
					}
					else {
						if(_.isFunction(func))
							val = func(val, key);
						else
							val = '<span>'+val+'</span>';
					}

					list += "<li><i>"+key+"</i>&nbsp;"+(val)+"</li>\n";
				}
			}
		}
		return list+"</ul>";
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