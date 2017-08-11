
Pois = new Mongo.Collection('pois');

Pois.before.insert(function(userId, doc) {
	doc.createdAt = K.Util.time();
});


if(Meteor.isServer) {
	Pois._ensureIndex({"geometry.coordinates": "2dsphere"});
	Pois._ensureIndex({"id": 1}, {unique: 1});
}

findPoisByLoc = function(ll) {

	var where;

	if(Meteor.isClient) {
		where = {
			'$near': ll,
			'$maxDistance': K.settings.public.pois.maxDistance
		};
	}
	else if(Meteor.isServer) {
		where = {
			'$near': {
				'$geometry': {
					'type': 'Point',
					'coordinates': [ll[1],ll[0]]
				},
				'$maxDistance': K.settings.public.pois.maxDistance
			}
		};
	}

	return Pois.find({
			'geometry.coordinates': where
		}, {limit: K.settings.public.pois.limit });
}