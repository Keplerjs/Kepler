
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

Meteor.publish('tracksByPlace', function(placeId) {

	if(this.userId) {

		var placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0],
			loc = placeData.loc;

		var tracksCur = findTracksByLoc(loc);

		if(true || tracksCur.count()===0) {


			var geojson = K.Osm.findOsmByLoc(loc, {
				type: 'way',
				filter: _.keys(K.settings.public.tracks.typesByTags),
				radius: 1000,//K.settings.public.tracks.maxDistance,
				limit: '',//10,//K.settings.public.tracks.limit,
				meta: false
			});
			
			if(geojson && geojson.features) {

				for(var i in geojson.features) {

					var feature = geojson.features[i];

					if( feature.properties.type==='way' &&
						feature.geometry.type==='LineString' ) {

						Tracks.upsert({id: feature.id}, feature);
						
						console.log('Pub: tracksByPlace import from osm ',feature.properties);
					}
				}
			}
			
			tracksCur = findTracksByLoc(placeData.loc);
		}

		console.log('Pub: tracksByPlace', placeData.loc, tracksCur.count());

		return [
			placeCur,
			tracksCur
		];	
	}
	else
		this.ready();	
});