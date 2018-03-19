
var geostats = Npm.require('geostats');

Kepler.Stats = {

	findPlaces: function(noClassify, noGeojson) {
		
		noClassify = _.isUndefined(noClassify) ? K.settings.public.stats.noClassify : noClassify;

		var data = Places.find({}, {
			fields: { createdAt:1, loc:1, rank:1, checkins:1, hist:1, convers:1, name:1 },
			sort: { createdAt: -1},
			//TODO limit
		}).fetch();

		//Clean data and calculate factors
		var data = _.map(data, function(d) {

			var l = K.Util.geo.roundLoc(d.loc, 1),
				f = (1+d.rank) * 
					(1+_.size(d.checkins)) * 
					(1+_.size(d.convers)) *
					(1+_.size(d.hist));
			return {
				loc: l,
				factor: f
			}
		});

		var stats = {
			count: data.length
		}

		var ret = {
			stats: stats
		};
	
		if(!noGeojson) {
			//raw cluster
			data = _.map(_.groupBy(data,'loc'), function(d) {
				var f = _.pluck(d,'factor').reduce(function(a,b){return a+b;}, 0);
				return {
					loc: d[0].loc,
					factor: f
				}
			});


			if(!noClassify) {
				var factors = _.pluck(data, 'factor');
				var series = new geostats(factors);
				var classy = series.getClassQuantile(10);
				//var classy = series.getClassEqInterval(10);
				//var classy = series.getClassJenks(10);
			}

			var geojson = K.Util.geo.createFeatureColl(_.map(data, function(d) {
				return K.Util.geo.createFeature('Point', d.loc.reverse(), {
					rank: noClassify ? d.factor : series.getClass(d.factor)
				});
			}));

			ret.geojson = geojson;
		}

		return ret;
	},

	findUsers: function(noClassify, noGeojson) {

		noClassify = _.isUndefined(noClassify) ? K.settings.public.stats.noClassify : noClassify;

		var data = Users.find({}, {
			fields: { createdAt:1, loc:1, loclast:1, places:1, friends:1, convers:1, hist:1, favorites:1 },
			sort: { createdAt: -1},
			//TODO limit
		}).fetch();

		//Clean data and calculate factors
		var data = _.map(data, function(d) {

			var f = (1+_.size(d.favorites)) * 
					(1+_.size(d.friends)) * 
					(1+_.size(d.convers)) *
					(1+_.size(d.places)) * 
					(1+_.size(d.hist));

			return {
				loc: K.Util.geo.roundLoc(d.loc || d.loclast, 1) || [],
				factor: f
			};
		});

		var stats = {
			count: data.length
		};

		var ret = {
			stats: stats
		};
	
		if(!noGeojson) {

			data = data.filter(function(d) {
				return d.loc.length;
			});

			//raw cluster
			data = _.map(_.groupBy(data,'loc'), function(d) {
				var f = _.pluck(d,'factor').reduce(function(a,b){return a+b;}, 0);
				return {
					loc: d[0].loc,
					factor: f
				}
			});

			if(!noClassify) {
				var factors = _.pluck(data, 'factor');
				var series = new geostats(factors);
				var classy = series.getClassQuantile(10);
				//var classy = series.getClassEqInterval(10);
				//var classy = series.getClassJenks(10);
			}
		
			var geojson = K.Util.geo.createFeatureColl(_.map(data, function(d) {
				return K.Util.geo.createFeature('Point', d.loc.reverse(), {
					rank: noClassify ? d.factor : series.getClass(d.factor)
				});
			}));

			
			ret.geojson = geojson;
		}
		
		return ret;
	},

	findUsersCountByDate: function(limit) {

		limit = limit || 90;

		var data = Users.find({}, {
			fields: { createdAt: 1 },
			sort: { createdAt: 1}
		}).fetch();
		
		data = _.countBy(data, function(u) {
			var date = new Date(parseInt(u.createdAt)),
				y = date.getFullYear(),
				m = date.getMonth(),
				d = date.getDate();
			return (new Date(y,m,d)).getTime();
		});

		var count = 0;
		data = _.map(data, function(num, key) {
			count+=num;
			return [parseInt(key), count];//, num];
		});

		//data = _.last(data, limit)

		var stats = {
			rows: data
		};

		var ret = {
			stats: stats
		};

		return ret;
	},

	findPlacesCountByDate: function(limit) {

		limit = limit || 90;

		var data = Places.find({}, {
			fields: { createdAt: 1 },
			sort: { createdAt: 1}
		}).fetch();
		
		data = _.countBy(data, function(u) {
			var date = new Date(parseInt(u.createdAt)),
				y = date.getFullYear(),
				m = date.getMonth(),
				d = date.getDate();
			return (new Date(y,m,d)).getTime();
		});

		var count = 0;
		data = _.map(data, function(num, key) {
			count+=num;
			return [parseInt(key), count];//, num];
		});

		//data = _.last(data, limit)

		var stats = {
			rows: data
		};

		var ret = {
			stats: stats
		};

		return ret;
	}		
};

Meteor.methods({
	findStats: function() {
		return {
			users: K.Stats.findUsers(true, true),
			places: K.Stats.findPlaces(true, true)
		}
	},
	findPlacesStats: function(noClassify) {
		return K.Stats.findPlaces(noClassify);
	},
	findUsersStats: function(noClassify) {
		return K.Stats.findUsers(noClassify);
	}
});