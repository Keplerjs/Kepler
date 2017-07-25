
Kepler.Place.include({

	tracksList: null,
	
	loadTracks: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.tracksList)
			cb(self.tracksList);
		else
			Meteor.subscribe('tracksByPlace', self.id, function() {
				
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

			K.Map.addGeojson( self.tracksToGeojson(tracksList, self) );
		});
	},
	getTracksList: function() {
		
		this._dep.depend();

		return this.tracksList;
	},

	tracksToGeojson: function(tracks, place) {

		var parkPoints = [],
			tracks = _.map(tracks, function(track) {

			track.properties.asc = track.properties.dis >= 0;

			if(track.properties.type==='access') {

				track.properties.name = i18n('trackstype.'+track.properties.type);
				
				parkPoints.push( K.Util.geo.createFeature('Point', track.geometry.coordinates[0], {type:'parking'}) );
			}
			
			return track;
		});

		var gloc = [place.loc[1], place.loc[0]],
			placeCircle = K.Util.geo.createFeature('Point', gloc, {type:'placeCircle'});

		var features = _.union(placeCircle, tracks, parkPoints);

		return K.Util.geo.createFeatureColl(features);
	}

});

