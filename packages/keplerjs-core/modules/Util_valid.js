
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

		return  (lat != NaN && lat <= 90 && lat >= -90) &&
				(lng != NaN && lng <= 90 && lng >= -90);
	},

	nameUser: function(name) {
		var reg = /^[a-zA-Z ]{3,30}$/;
		return reg.test(name);
	},
	
	email: function(email) {
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return reg.test(email);
	},

	image: function(fileObj) {
		
		if(Meteor.isServer)
			fileObj.size = Buffer.byteLength(fileObj.blob, 'binary');
		
		if(_.isUndefined(fileObj.size) || _.isUndefined(fileObj.type))
			return false;

		return (fileObj.size <= Meteor.settings.public.maxImageSize &&
			_.contains(['image/png','image/jpeg'], fileObj.type) );
	}
};