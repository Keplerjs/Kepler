
K.extend({
	findPlacesImportByUserId: function(userId) {
		return Places.find({
			'source.type': 'import',
			'userId': userId
		}, _.deepExtend({}, K.filters.placeItem, {
				sort: { createdAt: -1 },
				limit: 10
			})
		)
	}
});