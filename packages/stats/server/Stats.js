
var geostats = Npm.require('geostats');

Kepler.Stats = {

	geostats: function(factors) {

		var series = new geostats(factors);

			
			var classy = series.getClassQuantile(20);
			
			//var classy = series.getClassEqInterval(10);
			//var classy = series.getClassJenks(10);
		return series;
	},

	placeFactor: function(place) {
		return (1+place.rank) * 
			(1+_.size(place.checkins)) * 
			(1+_.size(place.convers)) *
			(1+_.size(place.hist));
	},

	userFactor: function(user) {
		return (1+_.size(user.favorites)) * 
			(1+_.size(user.friends)) * 
			(1+_.size(user.convers)) *
			(1+_.size(user.places)) * 
			(1+_.size(user.hist));
	},

	classify: function(data) {
		var factors = _.pluck(data, 'factor'),
			series = K.Stats.geostats(factors);

		return _.map(data, function(d) {
			d.factor = series.getClass(d.factor);
			return d;
		});
	},

	factorize: function(data, type) {
		return _.map(data, function(d) {
			return {
				loc: d.loc || d.loclast || [],
				factor: K.Stats[type+'Factor'](d)
			};
		});
	},

	clusterize: function(data) {

		data = data.filter(function(d) {
			return d.loc.length;
		});

		//approximate location for clustering
		var dataApprox = _.map(data, function(d) {
			d.loc = K.Util.geo.locRound(d.loc,1);
			return d;
		});

		var dataCluster = _.groupBy(dataApprox,'loc');

		return _.map(dataCluster, function(d) {
			
			var factorSum = _.pluck(d,'factor').reduce(function(a,b) {
				return a+b;
			}, 0);

			return {
				loc: d[0].loc,
				factor: factorSum
			}
		});
	}
};