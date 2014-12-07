//Convert KML and GPX to GeoJSON.
//[![Build Status](https://travis-ci.org/mapbox/togeojson.png)](https://travis-ci.org/mapbox/togeojson)


getTracksByIds = function(tracksIds) {
	tracksIds = _.map(tracksIds, function(id) {
		return new Meteor.Collection.ObjectID(id);
	});
	return Tracks.find({_id: {$in: tracksIds}});
};

getTracksByLoc = function(ll) {
	return Tracks.find({'properties.end': {
				'$near': {
					'$geometry': Climbo.util.geo.createPoint([ll[1],ll[0]]),
					'$maxDistance': Meteor.settings.public.maxTracksDist
				}
			}
		},{limit: Meteor.settings.public.maxTracks });
};

setTrackProperties = function(trackId) {	//estende proprieta di una traccia con dati geografici

	var trackId = new Meteor.Collection.ObjectID(trackId),
		track = Tracks.findOne(trackId);
	//Feature
	
	if(track && track.type==="Feature" && track.geometry.type==="LineString")
	{
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
	return track;
}

Meteor.methods({
	getTracksByIds: function(tracksIds) {

		if(!this.userId) return null;

		console.log('getTracksByIds',tracksIds);

		return getTracksByIds(tracksIds).fetch();
	},
	getTracksByLoc: function(loc) {

		if(!this.userId) return null;

		var tracks = getTracksByLoc(loc).fetch();

		console.log('getTracksByLoc',tracks.length);

		return tracks;
	},
	updateTracks: function() {
		
		if(!this.userId) return null;

		Tracks.find().forEach(function (track) {
			setTrackProperties(track._id._str);
			console.log('FOREACH setTrackProperties', track._id._str, track.properties.name);
		});
		console.log('updateTracks END ');
	}
})








