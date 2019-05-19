K.extend({

	findStatsConversByDate: function() {

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
	}
});