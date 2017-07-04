
Kepler.Place.include({

	tracksList: null,
	
	loadTracks: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.tracksList)
			cb(self.tracksList);
		else
			Meteor.subscribe('tracksByPlace', self.id, function() {
				
				self.tracksList = getTracksByLoc(self.loc).fetch();
				
				self._dep.changed();

				cb(self.tracksList);
			});
	},
	showTracks: function(trackId) {

		var self = this;

		self.loadTracks(function(tracksList) {

			if(trackId)
				tracksList = getTracksByIds([trackId]).fetch();

			K.Map.loadGeojson( tracksToGeojson(tracksList, self) );
		});
	},
	getTracksList: function() {
		
		this._dep.depend();

		return this.tracksList;
	}
});

