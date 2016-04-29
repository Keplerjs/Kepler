
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
