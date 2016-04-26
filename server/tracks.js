
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

Meteor.methods({
	getTracksByIds: function(tracksIds) {

		if(!this.userId) return null;

		console.log('getTracksByIds',tracksIds);

		return getTracksByIds(tracksIds).fetch();
	},
	getTracksByLoc: function(loc) {

		if(!this.userId) return null;

		var tracks = getTracksByLoc(loc).fetch();

		console.log('getTracksByLoc',tracks.length);

		return tracks;
	}
});
