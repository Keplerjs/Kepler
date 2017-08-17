
Tracks = new Mongo.Collection('tracks');

if(Meteor.isServer) {
	Tracks._ensureIndex({"id": 1}, {unique: 1});
	Tracks._ensureIndex({"geometry": "2dsphere"});
	Tracks._ensureIndex({"properties.end": "2dsphere"});
}

findTracksByIds = function(tracksIds) {
	return Tracks.find({_id: {$in: tracksIds}});
};

findTracksByLoc = function(ll) {
	var where;
	
	if(Meteor.isClient) {
		where = {
			'properties.end.coordinates': {
				'$near': ll,
				'$maxDistance': K.settings.public.tracks.maxDistance
			}
		};
	}
	else if(Meteor.isServer) {
		where = {
			'properties.end': {
				'$near': {
					'$geometry': {
						'type': 'Point',
						'coordinates': [ll[1],ll[0]]
					},
					'$maxDistance': K.settings.public.tracks.maxDistance
				}
			}
		};
	}

	return Tracks.find(where, {limit: K.settings.public.tracks.limit });
};

