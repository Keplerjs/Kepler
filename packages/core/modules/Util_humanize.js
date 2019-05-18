/**
 * humanize string methods
 * @namespace
 * @memberOf Util
 */
Kepler.Util.humanize = {
	//TODO creare numberHuman da usare in bagde chekins e stars 2000 -> 2K 
	
	//TODO https://github.com/HubSpot/humanize	
	//
	/**
	 * return azimut angle
	 * @param  {Number} ang  [description]
	 * @param  {String} code [description]
	 * @return {String}      [description]
	 */
	azimut: function(ang, code) {
		ang = parseFloat(ang);
		var texts = code ? "n,nne,ne,ene,e,ese,se,sse,s,ssw,sw,wsw,w,wnw,nw,nnw,n" : i18n('azimuth');
		return ang ? texts.split(',')[Math.round(ang/22.5)] : '';
	},
	/**
	 * time interval huamize in day,se,hours...
	 * @param  {Number} sec [description]
	 * @param  {Boolean} ago [description]
	 * @return {String}     [description]
	 */
	time: function(sec, ago) {
		//http://goo.gl/8DqYS
		if(sec && ago)
			sec = (K.Util.time()/1000) - (sec/1000);

		var y = Math.floor(sec / 31536000),
			m = Math.floor(sec / 2629744),
			d = Math.floor((sec % 31536000) / 86400),
			h = Math.floor(((sec % 31536000) % 86400) / 3600),
			i = Math.floor((((sec % 31536000) % 86400) % 3600) / 60),
			s = Math.floor((((sec % 31536000) % 86400) % 3600) % 60),
			ret = '';

		if(y>0)
			ret+=' '+y+i18n('year').split(',')[y>1?1:0];

		if(y<2 && m>0)
			ret+=' '+m+i18n('month').split(',')[m>1?1:0];

		if(m<2 && d>0)
			ret+=' '+d+i18n('day').split(',')[d>1?1:0];

		if(d<2 && h>0)
			ret+=' '+h+i18n('hour').split(',')[h>1?1:0];

		if(d<1) {
			if(h<1 && i>0)
				ret+=' '+i+i18n('minute').split(',')[i>1?1:0];
						
			if(i<2 && s>0 && i<1)
				ret+=' '+s+i18n('second').split(',')[s>1?1:0];
		}
		
		return ret;
	},
	/**
	 * date having name of days and months
	 * @param  {(String|Date|Number)} date  [description]
	 * @param  {Boolean} short [description]
	 * @return {String}       [description]
	 */
	date: function(date, short) {
		
		date = date || new Date();
		short = short || false;
		sep = sep || ' ';
	
		function fromDMY(all, d,m,y) {

				var oggi = new Date(),
					giorno = oggi.getDate(),
					mese = oggi.getMonth()+1,
					anno = oggi.getFullYear(),
					months = i18n('months_name').split(','),
					days = i18n('days_name').split(','),
					days_near = i18n('days_near').split(','),
					ret = '',
					dweek = (new Date(y, m-1, d)).getDay();

				var fulldate = d +sep+ months[parseInt(m)-1] + (y!=anno ? sep+y : '');

				if(m==mese && y==anno)
				{
					if( days_near[d-giorno+1] )
						ret = days_near[d-giorno+1] + sep;
					else{
						ret = Math.abs(d-giorno)<6 ? days[dweek]+sep : '';
						ret += fulldate;
					}
				}
				else
					ret = fulldate;
			
				return ret;
			}
			
		if(_.isNumber(date)) {
			date = new Date(date)
			return fromDMY(null, date.getDate(), date.getMonth()+1, date.getFullYear() );
		}

		else if(_.isString(date)) {
			var m;
			if(m = date.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/)) {
				return fromDMY(null, m[1], m[2], m[3]);
			}
			else if(m = date.match(/^(\d{4})-(\d{1,2})-(\d{1,2}).*/)) {

				return fromDMY(null, m[3], m[2], m[1]);
			} else {
				date = new Date(date);
				return fromDMY(null, date.getDate(), date.getMonth()+1, date.getFullYear() );
			}
		}

		else if(_.isDate(date))
			return fromDMY(null, date.getDate(), date.getMonth()+1, date.getFullYear() );
		else
			return null;
	},
	/**
	 * return distance in meters or kilometers
	 * @param  {Number} d    [description]
	 * @param  {Boolean} sign [description]
	 * @return {String}      [description]
	 */
	distance: function(d, sign) {
		sign = sign || false;
		var len='',unit='',s='';
		d= parseInt(d);
		if(d < 2000){
			d = d.toFixed(0);
			unit = 'm';
		}else{
			d = (d/1000).toFixed(1);
			unit = 'km';
		}
		if(sign)
			s = d>0 ? '+' : '';
		return s + d +unit;
	},
	/**
	 * file size in Byte,Mbyte,Giga
	 * @param  {Number} bytes   [description]
	 * @param  {Number} decimal [description]
	 * @return {String}         [description]
	 */
	filesize: function(bytes, decimal) {
		if (bytes === 0) return bytes;		
		decimal = decimal || 1;
		var sizes = ['Bytes','KB','MB','GB','TB'],
			i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), decimal) + ' ' + sizes[i];
	},
	/**
	 * string rappresent a geo location
	 * @param  {Array} ll  [description]
	 * @param  {Number} pre [description]
	 * @param  {String} sep [description]
	 * @return {String}     [description]
	 */
	loc: function (ll, pre, sep) {
		sep = sep || ',';
		pre = pre || 6;
		if(K.Util.valid.loc(ll))
			return parseFloat(ll[0]).toFixed(pre)+ sep +parseFloat(ll[1]).toFixed(pre);
		else
			return '';
	},
	/**
	 * clean ad humanize url string
	 * @param  {[type]} text [description]
	 * @return {[type]}      [description]
	 */
	url: function(u) {
		u = u.replace(/\/$/, '');
		u = u.replace(/^(?:https?:)?\/\//, '');
		u = u.split("?")[0];
		if((u.match(/\//g) || []).length>1)
			u = _.str.strLeft(u,'/')+'/.../'+_.str.strRightBack(u,'/');
		u = _.str.truncate(u,35);
		return u;
	}
};
