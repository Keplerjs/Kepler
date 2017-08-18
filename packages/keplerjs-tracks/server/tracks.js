
Tracks._ensureIndex({"id": 1}, {unique: 1});
Tracks._ensureIndex({"geometry": "2dsphere"});
//Tracks._ensureIndex({"properties.end": "2dsphere"});


//TODO refact!

Tracks.before.upsert(function(trackId, selector, modifier) {

	var track = modifier;

	if( track && track.type==="Feature" && 
		track.geometry.type==="LineString" ) {
		
		var prop = track.properties,
			geom = track.geometry,// K.Util.geo.linestringClean(track.geometry),
			p1 = _.first(geom.coordinates),
			p2 = _.last(geom.coordinates);

		var loc1 = [p1[1],p1[0]],
			loc2 = [p2[1],p2[0]],
			geo1 = K.Geoinfo.getFieldsByLoc(loc1, {ele: 1 }),
			geo2 = K.Geoinfo.getFieldsByLoc(loc2, {ele: 1 }),
			dis = Math.abs(parseInt(geo2.ele) - parseInt(geo1.ele));

		prop.dis  = parseInt( dis );
		prop.len  = parseInt( Math.round( K.Util.geo.linestringLen(geom) ) );
		prop.time = parseInt( K.Util.geo.timeTrack(prop.len, prop.dis) );
		prop.start= K.Util.geo.createPoint(p1);
		prop.end  = K.Util.geo.createPoint(p2);
		
		prop.createdAt = K.Util.time();

		delete prop.relations;
		delete prop.meta;
	}
	
	//Tracks.update(doc._id, track);
	console.log('Tracks: update properties', track.id);

});