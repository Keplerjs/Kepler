
var isAdmin = function() {
	if(!Meteor.user()) return false;
	return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
};

Meteor.methods({
	adminUpdateTracks: function() {		//estende proprieta di una traccia con dati geografici

		if(!isAdmin()) return null;

		Tracks.find().forEach(function (track) {

			var trackId = new Meteor.Collection.ObjectID(track._id._str),
				track = Tracks.findOne(trackId);
			
			if( track && track.type==="Feature" && 
				track.geometry.type==="LineString" ) {
				
				var prop = track.properties || {},
					geom = Climbo.util.geo.linestringClean(track.geometry),
					p1 = _.first(geom.coordinates),
					p2 = _.last(geom.coordinates);

				prop.len  = parseInt( Math.round( Climbo.util.geo.linestringLen(geom) ) );
				prop.dis  = parseInt( Climbo.geodata.elevation([p2[1],p2[0]]) - Climbo.geodata.elevation([p1[1],p1[0]]) ); //negativo per discesa
				prop.time = parseInt( Climbo.util.geo.timeTrack(prop.len, prop.dis) );
				prop.start= Climbo.util.geo.createPoint(p1);
				prop.end  = Climbo.util.geo.createPoint(p2);
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