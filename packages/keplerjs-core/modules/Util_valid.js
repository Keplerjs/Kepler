
Kepler.Util.valid = {

	//TODO name place
	//TODO valid bbox

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

	name: function(name) {
		//maintain regexp compatible with K.Util.sanitize.name!!!
		//...replace(/[^a-z0-9\.' ]/g,'');
		var reg = /^[a-zA-Z0-9\.' ]$/;
		return reg.test(name);
	},
	
	email: function(email) {
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return reg.test(email);
	}
};