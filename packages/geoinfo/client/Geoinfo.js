
//move this module in client AND server

Kepler.Geoinfo = {

	loadByLoc: function(loc, cb) {

/*		var showFields = {
			"loc": true,
			"near": true,
			//"come": true,
			"prov": true,
			//"reg": true,
			"naz": true
		};*/


		Meteor.call('findGeoinfoByLoc', loc, null, function(err, data) {

			if(err){
				console.log('findGeoinfoByLoc',err)
			}
			else if(data) {


				var feature = K.Util.geo.createFeature('Point', [loc[1],loc[0]], data);
				feature.templateMarker = 'markerGeoinfo';
				feature.templatePopup = 'popupGeojson_geoinfo';

				var geojson = K.Util.geo.createFeatureColl([feature]);

				K.Map.hideCursor();
				K.Map.addGeojson(geojson, {noFitBounds: true}, function() {
					K.Map.layers.geojson.invoke('openPopup');
				});
			}
			if(_.isFunction(cb))
				cb(geojson);
		});
	},

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
