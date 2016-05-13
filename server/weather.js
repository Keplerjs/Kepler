
var	getOpts = {
		timeout: 20000,	//timeout connessioni http remote
		httpHeaders: {
			//'Referer': Meteor.settings.website.domain
			'User-Agent': ''
		}
	};

var weatherAPI = function(ll) {

	var wundergroundKey = Meteor.settings.accounts.wundergroundKey,
		timeo = 20000,	//timeout connessioni http remote
		day;

	var url ='http://api.wunderground.com/api/'+wundergroundKey+'/forecast/q/'+ll[0]+","+ll[1]+'.json',
		res = HTTP.get(url, getOpts);
		
	if(res.statusCode == 200 && res.data && res.data.forecast)
	{
		console.log("weatherAPI()", ll);	
		return _.map(res.data.forecast.simpleforecast.forecastday, function(day) {
			
			return {
				//today: day.period==1 || day.period==0,
				date:  day.date.day+'-'+day.date.month+'-'+day.date.year,
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

		ll = K.util.geo.roundLoc(ll, 2);
		
		console.log("getWeatherByLoc()",ll);

		var key = K.util.hashGen('daily') + ll.join('_');
		//daily hash

		var val = K.cache.get(key, 'weather');

		return val || K.cache.set(key, weatherAPI(ll), 'weather');
	}
});
