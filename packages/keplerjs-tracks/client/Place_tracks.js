
Kepler.Place.include({

	tracksList: null,
	
	loadTracks: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.tracksList)
			cb(self.tracksList);
		else
			Meteor.subscribe('tracksByPlace', self.id, K.Map.getBBox(), function() {
				
				self.tracksList = findTracksByLoc(self.loc).fetch();
				
				self._dep.changed();

				cb(self.tracksList);
			});
	},
	showTracks: function(trackId) {

		var self = this;

		self.loadTracks(function(tracksList) {

			if(trackId)
				tracksList = findTracksByIds([trackId]).fetch();

			K.Map.addGeojson( self.tracksToGeojson(tracksList, self), {
				style: K.settings.public.map.styles.tracks
			});
		});
	},
	getTracksList: function() {
		
		this._dep.depend();

		return this.tracksList;
	},

	tracksToGeojson: function(tracks, place) {

		var tracks = _.map(tracks, function(track) {
			track.properties.asc = track.properties.dis >= 0;
			track.templatePopup = 'popupGeojson_tracks';
			return track;
		});

		return K.Util.geo.createFeatureColl(tracks);
	}

});

