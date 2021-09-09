/**
 * validation string methods
 * @namespace
 * @memberOf Util
 */
Kepler.Util.valid = {

	//TODO name place
	//TODO valid bbox
	//TODO valid GeoJSON
	
	bbox: function(bb) {
		return _.isArray(bb) && 
			   _.isArray(bb[0]) && _.isArray(bb[1]) &&
			   bb[0].length===2 && bb[1].length===2
	},

	loc: function(loc) {
		var lat, lng;

		if(_.isArray(loc)) {
			if( (typeof loc[0] === 'undefined' || loc[0] === null) ||
				(typeof loc[1] === 'undefined' || loc[1] === null) )
				return false;
			lat = loc[0];
			lng = loc[1];
		}
		else if(_.isObject(loc)) {
			var lat, lng;

			if(loc.hasOwnProperty('lat'))
				lat = loc.lat;
			else if(loc.hasOwnProperty('latitude'))
				lat = loc.latitude;
			if(loc.hasOwnProperty('lng'))
				lng = loc.lng;
			else if(loc.hasOwnProperty('lon'))
				lng = loc.lon;
			else if(loc.hasOwnProperty('longitude'))
				lng = loc.longitude;
		}
		else
			return false;
		
		lat = parseFloat(lat);
		lng = parseFloat(lng);

		/* world bounds [[-90, -180], [90, 180]] */
		return  (lat != NaN && lng != NaN) && 
				(lat <= 90 && lat >= -90) &&
				(lng <= 180 && lng >= -180);
	},

	point: function(geom) {
		return !!(geom &&
			   geom.type === 'Point' && 
			   geom.coordinates && 
			   geom.coordinates.length===2);
	},

	name: function(name) {
		//maintain regexp compatible with K.Util.sanitize.name!
		var reg = /^[a-zA-Z0-9\.'\- ]{0,255}$/;
		return reg.test(name);
	},
	
	username: function(uname) {
		//maintain regexp compatible with K.Util.sanitize.username!
		var reg = /^[a-z0-9\.\-_]{3,16}$/;
		return reg.test(uname);
	},

	email: function(email) {
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return reg.test(email);
	},

	url: function(url) {
		var reg = /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)*(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;        
		return !!reg.test(url);
	}	
};
