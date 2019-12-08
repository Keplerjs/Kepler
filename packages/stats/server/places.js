

Meteor.methods({
	findStatsPlacesByGeo: function(bbox) {
		return K.findStatsPlacesByGeo(bbox);
	}
});

K.extend({

	findStatsPlacesByGeo: function(bbox) {

		var w = {};/* //TODO K.Util.valid.bbox(bbox) ? {
			loc: {
				'$within': {
					'$box': K.Util.geo.bboxRound(bbox,0)
				}
			}
		} : {};*/

		var cur = Places.find(w, K.filters.placeStats),
			total = cur.count(),
			data = cur.fetch(),
			features = [];
		
		var dataFactors = K.Stats.factorize(data,'place');

		var dataCluster = K.Stats.clusterize(dataFactors);
		
		if(K.settings.stats.classify)
			dataCluster = K.Stats.classify(dataCluster);

		features = _.map(dataCluster, function(d) {
			return K.Util.geo.feature('Point', d.loc.reverse(), {
				rank: d.factor
			});
		});

		return K.Util.geo.featureColl(features, {
			count: total
		});
	},

	findStatsPlacesByDate: function() {

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

	findStatsPlacesByField: function(field) {

		if(!field) return null;

		var denyFields = [
			'geometry','geometry.coordinates',
		];

		if(_.contains(denyFields, field)) return null;

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
			v = _.isString(v) ? v.toLowerCase() : v;
			v = _.isArray(v) ? v.sort().join() : v;
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
	}
});

