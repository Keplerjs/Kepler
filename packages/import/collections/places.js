
K.extend({
	findPlacesImportByUser: function(userId) {
		return Places.find({
			'import.name': {$exists:true},
			'userId': userId
		}, _.deepExtend({}, K.filters.placeItem, {
				fields: {
					import:1
				},
				sort: { createdAt: -1 },
				limit: 30
			})
		);
	},
	findPlacesByImportName: function(userId, name) {
		return Places.find({
			'import.name': name,
			'userId': userId
		}, _.deepExtend({}, K.filters.placeItem, {
				fields: {
					import:1
				},
				sort: { createdAt: -1 },
				limit: 30
			})
		);
	}
});