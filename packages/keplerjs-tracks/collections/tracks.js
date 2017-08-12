
Tracks = new Mongo.Collection('tracks');

if(Meteor.isServer) {
	Tracks._ensureIndex({"id": 1});
	Tracks._ensureIndex({"geometry.coordinates": "2dsphere"});
	Tracks._ensureIndex({"properties.end.coordinates": "2dsphere"});
}


findTracksByIds = function(tracksIds) {
	return Tracks.find({_id: {$in: tracksIds}});
};

findTracksByLoc = function(ll) {
	var where;
	
	if(Meteor.isClient) {
		where = {
			'properties.end.coordinates': {
				'$near': ll,
				'$maxDistance': K.settings.public.tracks.maxDistance
			}
		};
	}
	else if(Meteor.isServer) {
		where = {
			'properties.end': {
				'$near': {
					'$geometry': {
						'type': 'Point',
						'coordinates': [ll[1],ll[0]]
					},
					'$maxDistance': K.settings.public.tracks.maxDistance
				}
			}
		};
	}

	return Tracks.find(where, {limit: K.settings.public.tracks.limit });
};

/*	
//TODO move to Tracks.after.insert(function(){ ... })

updateTracksGeoinfo: function() {

//estende proprieta di una traccia con dati geografici

		Tracks.find().forEach(function (track) {

			var trackId = track._id,
				track = Tracks.findOne(trackId);
			
			if( track && track.type==="Feature" && 
				track.geometry.type==="LineString" ) {
				
				var prop = track.properties || {},
					geom = K.Util.geo.linestringClean(track.geometry),
					p1 = _.first(geom.coordinates),
					p2 = _.last(geom.coordinates);

				prop.len  = parseInt( Math.round( K.Util.geo.linestringLen(geom) ) );
				prop.dis  = parseInt( K.Geoinfo.elevation([p2[1],p2[0]]) - K.Geoinfo.elevation([p1[1],p1[0]]) ); //negativo per discesa
				prop.time = parseInt( K.Util.geo.timeTrack(prop.len, prop.dis) );
				prop.start= K.Util.geo.createPoint(p1);
				prop.end  = K.Util.geo.createPoint(p2);
			}
			
			Tracks.update(trackId, track);
			console.log('updateTracks', track.properties );
		});
	},*/
