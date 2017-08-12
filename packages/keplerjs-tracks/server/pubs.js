
Meteor.publish('tracksByIds', function(trackIds) {

	if(this.userId) {

		console.log('Pub: tracksByIds', trackIds);

		return [
			K.getTracksByIds(trackIds)
		];	
	}
	else
		this.ready();	
});

Meteor.publish('tracksByPlace', function(placeId, bbox) {

	if(this.userId) {

		var placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0];

		var tracksCur = findTracksByLoc(placeData.loc);

		if(tracksCur.count()===0) {

			var geojson = K.Osm.findOsmByBBox(bbox, {
				type: 'way',
				filter: _.keys(K.settings.public.tracks.typesByTags),
				radius: K.settings.public.tracks.maxDistance,
				limit: K.settings.public.tracks.limit,
				meta: false
			});
			console.log(geojson)
			if(!geojson || !geojson.features)
				return [];

			for(var i in geojson.features) {
				var feature = geojson.features[i];

				Tracks.upsert({id: feature.id}, feature);
			}
			console.log('Pub: tracksByPlace insert from osm ', geojson.features.length);
		}

		console.log('Pub: tracksByPlace', placeData.name, tracksCur.count());

		return [
			placeCur,
			tracksCur
		];	
	}
	else
		this.ready();	
});