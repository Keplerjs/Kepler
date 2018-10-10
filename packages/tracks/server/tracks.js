
Tracks._ensureIndex({"id": 1}, {unique: 1});
Tracks._ensureIndex({"geometry": "2dsphere"});
//Tracks._ensureIndex({"properties.end": "2dsphere"});

Tracks.before.upsert(function(trackId, selector, modifier) {

	var track = modifier;

	track.properties = K.Geoinfo.getTrackInfo(track);

	track.properties.createdAt = K.Util.time();
	
	//clean osm tags
	delete track.properties.relations;
	delete track.properties.meta;
	
	//Tracks.update(doc._id, track);
	console.log('Tracks: update properties', track.id);

});