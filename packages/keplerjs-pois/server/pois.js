
Pois._ensureIndex({"id": 1}, {unique: 1});
Pois._ensureIndex({"geometry": "2dsphere"});

Pois.before.insert(function(userId, doc) {
	doc.createdAt = K.Util.time();
});


