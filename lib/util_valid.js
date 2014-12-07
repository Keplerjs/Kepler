
Climbo.util.valid = {

	//TODO validUsername using sanitizeFilename and db check
 	
	loc: function(ll) {
		if( (typeof ll === 'undefined' || ll === null) ||
			(typeof ll[0] === 'undefined' || ll[0] === null) ||
			(typeof ll[1] === 'undefined' || ll[1] === null) )
			return false;
		var lat = parseFloat(ll[0]),
			lon = parseFloat(ll[1]);
		return  (lat != NaN && lat <= 90 && lat >= -90) &&
				(lon != NaN && lon <= 90 && lon >= -90);
	},

	nameUser: function(name) {
		var reg = /^[a-zA-Z ]{3,30}$/;
		return reg.test(name);
	},
	
	email: function(email) {
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return reg.test(email);
	},

	image: function(file) {
		return (file.size <= Meteor.settings.public.maxImageSize &&
			_.contains(['image/png','image/jpeg'], file.type) );
	}
};