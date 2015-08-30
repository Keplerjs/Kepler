/*
	class Place with Tracks support
*/
Climbo.Place.include({

	cache: {
		tracks: null
	},
	
	loadTracks: function(show) {
		
		show = _.isUndefined(show) ? true : false;

		var self = this;

		function addInfo(track) {

			track.properties.asc = track.properties.dis >= 0;

			if(track.properties.tipo==='access')
				return Climbo.util.geo.createFeatureColl([
					track,
					Climbo.util.geo.createFeature('Point',{tipo:'parking'},track.geometry.coordinates[0])
				]);
			else
				return track;
		}

		if( self.tracks > 0 && self.cache.tracks && show)
			Climbo.map.loadGeojson( _.map(self.cache.tracks, addInfo) );
		else
			Meteor.call('getTracksByLoc', self.loc, function(err, tracks) {

				if(tracks && tracks.length > 0)
				{
					self.cache.tracks = tracks;
					self.update();
					if(show)
						Climbo.map.loadGeojson( _.map(tracks, addInfo) );
				}
				else
					self.cache.tracks = 0;
			});

		//TODO: usare subscribe come con Convers!!!
		
		// Meteor.subscribe('tracksByLoc', self.loc, function() {
		// 	var tracksIds = _.map(self.tracks, function(id) {
		// 		return new Meteor.Collection.ObjectID(id);
		// 	});
		// 	//TODO self.cache.tracks = addPoiParking(tracks);
		// 	//Climbo.map.loadGeojson(poi parking)
		// 	_.each(Tracks.find({_id: {$in: tracksIds}}).fetch(), Climbo.map.loadGeojson);
		// 	//self.update();
		// });

	}
});