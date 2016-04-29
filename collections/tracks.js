
Tracks = new Meteor.Collection('tracks');

getTracksByIds = function(tracksIds) {
	tracksIds = _.map(tracksIds, function(id) {
		return new Meteor.Collection.ObjectID(id);
	});
	return Tracks.find({_id: {$in: tracksIds}});
};

getTracksByLoc = function(ll) {
	return Tracks.find({'properties.end': {
				'$near': {
					'$geometry': Climbo.util.geo.createPoint([ll[1],ll[0]]),
					'$maxDistance': Meteor.settings.public.maxTracksDist
				}
			}
		},{limit: Meteor.settings.public.maxTracks });
};
