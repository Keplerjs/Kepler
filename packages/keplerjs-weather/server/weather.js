
var	getOpts = {
		timeout: 20000,	//timeout connessioni http remote
		httpHeaders: {
			'User-Agent': ''
		}
	};

var weatherAPI = function(ll) {

	var url = _.template("http://api.wunderground.com/api/{key}/forecast/q/{lat},{lon}.json", {
			key: K.settings.weather.wundergroundKey,
			lat: ll[0], lon: ll[1]
		});

	try {
		res = HTTP.get(url, getOpts);
	} catch(e) {
		console.log('Weather: error',e);
		return null;
	}

	if(res && res.statusCode == 200 && res.data && res.data.forecast)
	{
		return _.map(res.data.forecast.simpleforecast.forecastday, function(day) {
			
			return {
				//today: day.period==1 || day.period==0,
				date:  day.date.year+'-'+day.date.month+'-'+day.date.day,
				//TODO EJSON Date
				temp:  {
					min: day.low.celsius,
					max: day.high.celsius
				},
				wind: {
					vel: parseFloat(day.avewind.kph),
					ang: parseFloat(day.avewind.degrees)
				},
				prob: parseFloat(day.pop),
				humid: parseFloat(day.avehumidity),
				icon: day.icon
			};
		});
	}
	else
		return null;
};

Meteor.methods({
	getWeatherByLoc: function(ll) {

		ll = K.Util.geo.roundLoc(ll, 2);

		var key = K.Util.timeHash('daily') +'_'+ ll.join('_'),
			val = K.Cache.get(key, 'weather');

		return val || K.Cache.set(key, weatherAPI(ll), 'weather');
	}
});
