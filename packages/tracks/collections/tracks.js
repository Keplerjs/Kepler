
Tracks = new Mongo.Collection('tracks');

K.findTracksByIds = function(tracksIds) {
	return Tracks.find({_id: {$in: tracksIds}});
};

K.findTracksByLoc = function(ll) {

	return Tracks.find({
			//'properties.end': {
			'geometry': {
				'$near': {
					'$geometry': {
						'type': 'Point',
						'coordinates': [ll[1],ll[0]]
					},
					'$maxDistance': K.settings.public.tracks.maxDistance
				}
			}
		}, {
			limit: K.settings.public.tracks.limit
		});
};

