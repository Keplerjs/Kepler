
var tracksToGeojson = function(tracks, place, type) {

	if(type) {
		tracks = _.filter(tracks, function(feature) {
			return feature.properties.type === type;
		});
	}

	var parkPoints = [],
		tracks = _.map(tracks, function(track) {

		track.properties.asc = track.properties.dis >= 0;

		if(track.properties.type==='access') {

			track.properties.name = i18n('tracks.'+track.properties.type);
			
			parkPoints.push( K.util.geo.createFeature('Point', track.geometry.coordinates[0], {type:'parking'}) );
		}
		
		return track;
	});

	var gloc = [place.loc[1], place.loc[0]],
		placeCircle = K.util.geo.createFeature('Point', gloc, {type:'placeCircle'});

	var features = _.union(placeCircle, tracks, parkPoints);

	return K.util.geo.createFeatureColl(features);
}

Kepler.Place.include({

	tracksList: null,
	
	loadTracks: function() {

		var self = this;

		if(!self.tracksList)
			Meteor.subscribe('tracksByPlace', self.id, function() {
				self.tracksList = getTracksByLoc(self.loc).fetch();
				self._dep.changed();
			});
	},
	showTracks: function(trackId) {
		this.loadTracks();
		//TODO if(trackId) show each track separately
		K.map.loadGeojson( tracksToGeojson(this.tracksList, this) );
	},
	getTracksList: function() {
		return getTracksByLoc(this.loc).fetch();
	}
});

