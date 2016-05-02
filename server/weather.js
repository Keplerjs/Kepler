
weatherAPI = function(ll) {

	var wundergroundKey = Meteor.settings.accounts.wundergroundKey,
		timeo = 20000,	//timeout connessioni http remote
		day;

	var res = HTTP.get('http://api.wunderground.com/api/'+wundergroundKey+'/forecast/q/'+ll[0]+","+ll[1]+'.json', {timeout: timeo});
		
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

		ll = K.util.geo.roundLoc(ll, 1);
		
		console.log("getWeatherByLoc()",ll);

		var key = parseInt(K.util.timeUnix()/(60*60*24*1))+'_'+ll.join('_');
		//daily hash

		var val = K.cache.get('weather', key );

		return val || K.cache.set('weather', key, weatherAPI(ll) );
	}
});
