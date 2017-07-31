
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