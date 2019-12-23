
//move this module in client AND server

Kepler.Geoinfo = {
	
	suncalc: function(loc) {
		//https://github.com/mourner/suncalc/issues/101

		if(!K.Util.valid.loc(loc)) return {};

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

	loadByLoc: function(loc, cb) {

		Meteor.call('findGeoinfoByLoc', loc, null, function(err, data) {

			data = _.extend(data, K.Geoinfo.suncalc(loc));

			var feature = K.Util.geo.feature('Point', [loc[1],loc[0]], data);
			feature.templateMarker = 'markerGeoinfo';
			feature.templatePopup = 'popupGeojson_geoinfo';

			var geojson = K.Util.geo.featureColl([feature]);

			K.Map.hideCursor();
			K.Map.addGeojson(geojson, {
				label: i18n('btn_geosearch')
			},function() {
				K.Map.layers.geojson.invoke('openPopup');
			});

			if(_.isFunction(cb))
				cb(geojson);
		});
	},
	/*
	//TODO
	getAzimut: function(loc) {
		var sunriseAzimuth = SunCalc.getTimes(new Date(), loc[0],loc[1]).azimuth * 180 / Math.PI;
	},*/
};
