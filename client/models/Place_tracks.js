
function tracksToGeojson(tracks, place, type) {

	if(type) {
		tracks = _.filter(tracks, function(feature) {
			return feature.properties.tipo === type;
		});
	}

	var parkPoints = [],
		tracks = _.map(tracks, function(track) {

		track.properties.asc = track.properties.dis >= 0;

		if(track.properties.tipo==='access') {

			track.properties.name = i18n('ui.tracks.'+track.properties.tipo);
			
			parkPoints.push( Climbo.util.geo.createFeature('Point', track.geometry.coordinates[0], {tipo:'parking'}) );
		}
		
		return track;
	});

	var gloc = [place.loc[1], place.loc[0]],
		placeCircle = Climbo.util.geo.createFeature('Point', gloc, {tipo:'placeCircle'});

	var features = _.union(placeCircle, tracks, parkPoints);

	return Climbo.util.geo.createFeatureColl(features);
}

Climbo.Place.include({
	
	loadTracks: function(trackId) {

		var tracks;

		if(trackId)
			tracks = getTracksByIds([trackId]).fetch();
		else
			tracks = getTracksByLoc(this.loc).fetch();

		Climbo.map.loadGeojson( tracksToGeojson(tracks, this) );
	},
	getTracksList: function() {

		return getTracksByLoc(this.loc).fetch();
	}
});