
Kepler.Tracks = {
	typeByTags: function(tags) {
		var types = K.Util.sets(K.settings.public.tracks.typesByTags),
			type, val;

		for(var tag in tags) {
			val = tags[tag];
			type = types[tag+'='+val];
			if(type)
				return type;
		}
		return type;
	},
 	tracksToGeojson: function(tracks, place) {

		var tracks = _.map(tracks, function(track) {
			track.templatePopup = 'popupGeojson_tracks';
			return track;
		});

		return K.Util.geo.featureColl( tracks );
	}
};