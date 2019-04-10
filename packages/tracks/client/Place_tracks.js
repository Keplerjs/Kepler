
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
				tracksList = K.findTracksByIds([trackId]).fetch();

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
			track.templatePopup = 'popupGeojson_tracks';
			return track;
		});
		//var placePoint = K.Util.geo.createPoint([place.loc[1], place.loc[0]]);
 		//tracks = _.union(tracks, placePoint);

		return K.Util.geo.createFeatureColl( tracks );
	}

});

