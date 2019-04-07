
var geostats = Npm.require('geostats');

Kepler.Stats = {

	findPlaces: function(noClassify) {
		
		noClassify = _.isUndefined(noClassify) ? K.settings.public.stats.noClassify : noClassify;

		var data = Places.find({}, {
			fields: { createdAt:1, loc:1, rank:1, checkins:1, hist:1, convers:1 },
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

		var count = data.length;

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

		geojson.properties = {
			count: count
		};

		return geojson;
	},

	findUsers: function(noClassify) {

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

		data = data.filter(function(d) {
			return d.loc.length;
		});

		var count = data.length;

		//raw clusterret
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

		geojson.properties = {
			count: count
		};

		return geojson;
	},

	findUsersByDate: function() {

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
			count += num;
			return [parseInt(key), count];
		});

		return {
			count: count,
			rows: data
		};
	},

	findPlacesByDate: function() {

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
			count += num;
			return [parseInt(key), count];//, num];
		});

		return {
			count: count,
			rows: data
		};
	},

	findConversByDate: function() {

		var data = K.Messages.find({}, {
			fields: { updatedAt: 1 },
			sort: { updatedAt: 1}
		}).fetch();
		
		data = _.countBy(data, function(u) {
			var date = new Date(parseInt(u.updatedAt)),
				y = date.getFullYear(),
				m = date.getMonth(),
				d = date.getDate();
			return (new Date(y,m,d)).getTime();
		});

		var count = 0;
		data = _.map(data, function(num, key) {
			count += num;
			return [parseInt(key), count];
		});

		return {
			count: count,
			rows: data
		};
	},

	findPlacesByField: function(field) {

		if(!field) return null;
		
		var filter = {},
			fields = {};
		
		filter[field]= {'$exists':true, '$ne':null, '$ne': ''};
		fields[field]= 1;

		var data = Places.find(filter, {
			fields: fields,
			sort: { createdAt: 1}
		}).fetch();

		data = _.filter(data, function(o) {
			var v = K.Util.getPath(o, field);
			return v!='' && v!=null;
		});

		data = _.map(data, function(o) {
			var v = K.Util.getPath(o, field);
			console.log(v)
			v = _.isString(v) ? v.toLowerCase() : v;
			v = _.isArray(v) ? v.length : v;
			v = _.isObject(v) ? JSON.stringify(v) : v;
			K.Util.setPath(o, field, v);
			return o;
		});

		data = _.countBy(data, function(o) {
			return K.Util.getPath(o, field);
		});

		var count = 0;
		var rows = _.map(data, function(num, key) {
			count += num;
			return [key, num];
		});

		rows = _.sortBy(rows, function(r) {
			return r[1];
		}).reverse();

		return {
			count: count,
			rows: rows
		};
	},

	findUsersByField: function(field) {

		if(!field) return null;

		var allowFields = [
			'createdAt','loginAt','status',
			'city','lang','mob',
			'checkins','friends','source','places'
		];

		if(!_.contains(allowFields, field)) return null;

		var filter = {},
			fields = {};
		
		filter[field]= {'$exists':true, '$ne':null, '$ne': ''};
		fields[field]= 1;
		//fields._id = -1;

		var data = Users.find(filter, {
			fields: fields,
			sort: { createdAt: 1}
		}).fetch();

		data = _.filter(data, function(o) {
			var v = K.Util.getPath(o, field);
			return v!='' && v!=null;
		});

		data = _.map(data, function(o) {
			var v = K.Util.getPath(o, field);
			v = _.isString(v) ? v.toLowerCase() : v;
			v = _.isArray(v) ? v.length : v;
			v = _.isObject(v) ? JSON.stringify(v) : v;
			K.Util.setPath(o, field, v);
			return o;
		});

		data = _.countBy(data, function(o) {
			console.log(o)
			return K.Util.getPath(o, field);
		});

		var count = 0;
		var rows = _.map(data, function(num, key) {
			count += num;
			return [key, num];
		});

		rows = _.sortBy(rows, function(r) {
			return r[1];
		}).reverse();

		return {
			count: count,
			rows: rows
		};
	},
};

Meteor.methods({
	findPlacesStats: function(noClassify) {
		return K.Stats.findPlaces(noClassify);
	},
	/*findUsersStats: function(noClassify) {
		return K.Stats.findUsers(noClassify);
	}*/
});