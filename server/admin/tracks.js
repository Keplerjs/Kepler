
K.admin.addMethods({
	updateTracks: function() {		//estende proprieta di una traccia con dati geografici

		if(!K.admin.isMe()) return null;

		Tracks.find().forEach(function (track) {

			var trackId = new Mongo.Collection.ObjectID(track._id._str),
				track = Tracks.findOne(trackId);
			
			if( track && track.type==="Feature" && 
				track.geometry.type==="LineString" ) {
				
				var prop = track.properties || {},
					geom = K.util.geo.linestringClean(track.geometry),
					p1 = _.first(geom.coordinates),
					p2 = _.last(geom.coordinates);

				prop.len  = parseInt( Math.round( K.util.geo.linestringLen(geom) ) );
				prop.dis  = parseInt( K.geoapi.elevation([p2[1],p2[0]]) - K.geoapi.elevation([p1[1],p1[0]]) ); //negativo per discesa
				prop.time = parseInt( K.util.geo.timeTrack(prop.len, prop.dis) );
				prop.start= K.util.geo.createPoint(p1);
				prop.end  = K.util.geo.createPoint(p2);
			}
			
			Tracks.update(trackId, track);
			console.log('updateTracks', track.properties );
		});
	},
	cleanPlaceTracks: function(val) {

		if(!K.admin.isMe()) return null;

		Places.update(true, {
			$set: {
				tracks: val
			}
		});
	}
});