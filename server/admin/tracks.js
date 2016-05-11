
var isAdmin = function() {
	if(!Meteor.user()) return false;
	return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
};

Meteor.methods({
	adminUpdateTracks: function() {		//estende proprieta di una traccia con dati geografici

		if(!isAdmin()) return null;

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
			console.log('setTrackProperties', trackId );

			console.log('FOREACH setTrackProperties', track._id._str, track.properties.name);
		});

		console.log('adminUpdateTracks');
	},
	adminCleanPlaceTracks: function(val) {

		if(!isAdmin()) return null;

		Places.update(true, {
			$set: {
				tracks: val
			}
		});

		console.log('adminCleanPlaceTracks');
	}
});