
Kepler.Place.include({

	tracksList: null,
	
	loadTracks: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.tracksList)
			cb(self.tracksList);
		else
			Meteor.subscribe('tracksByPlace', self.id, function() {
				
				self.tracksList = K.findTracksByLoc(self.loc).fetch();
				
				if(!self.tracksList.length)
					sAlert.warning(i18n('error_notracksfound'))

				self._dep.changed();

				cb(self.tracksList);
			});
	},
	showTracks: function(trackId) {

		var self = this;

		self.loadTracks(function(tracksList) {

			if(trackId)
				tracksList = K.findTracksById(trackId).fetch();

			K.Map.addGeojson( K.Tracks.tracksToGeojson(tracksList, self), {
				label: i18n('btn_tracks'),
				style: K.settings.public.map.styles.tracks
			});
		});
	},
	getTracksList: function() {

		var self = this;
		
		this._dep.depend();

		return _.map(this.tracksList, function(t) {
			t.placeId = self.id;
			return t;
		});
	}
});

