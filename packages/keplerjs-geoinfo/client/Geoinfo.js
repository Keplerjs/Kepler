
Kepler.Geoinfo = {

	suncalc: function(loc) {
		//https://github.com/mourner/suncalc/issues/101

		if(!K.Util.valid.loc(loc)) return false;

		var now = new Date(),
			utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000),
			times = SunCalc.getTimes(now, loc[0], loc[1]);

		function format(date) {
			date.setHours(date.getHours() + 3);
			return date.toTimeString().slice(0,5);
		}

		return {
			//TODO return all times!
			sunrise: format(times.sunrise),
			sunset: format(times.sunset)
		};
	},
	
	geocoding: function(text, cb) {
		
		//var ret = new ReactiveVar([]);

		Meteor.call('findGeocoding', text, function(err, data) {
			if(err)
	            console.log('Geoinfo',err);
	        else
	            cb(data);//ret.set(data);
		});

		//return ret.get();
	}
	/*
	//TODO
	getAzimut: function(loc) {
		var sunriseAzimuth = SunCalc.getTimes(new Date(), loc[0],loc[1]).azimuth * 180 / Math.PI;
	},*/
};
