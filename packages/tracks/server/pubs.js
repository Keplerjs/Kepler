
Meteor.publish('tracksByPlace', function(placeId) {
	if(this.userId || K.settings.public.router.publicRoutes.placeTracks) {

		var sets = K.settings.public.tracks,
			tags = _.keys(K.Util.sets(sets.typesByTags)),
			placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0],
			loc = placeData.loc,
			imported = 0;

		var findOsm = function(loc) {
			return K.Osm.findByLoc(loc, {
				types: 'way',
				tags: tags,
				dist: sets.maxDistance,
				limit: sets.limit,//unlimit find way! cause nodes splitting,
				meta: false
			});
		}

		var cachePrec = 2,
			cacheLoc = K.Util.geo.locRound(placeData.loc, cachePrec),
			geojson = null;

		if(sets.caching)
			geojson = K.Cache.get(cacheLoc, 'tracks', findOsm);
		else
			geojson = findOsm(placeData.loc); 

		if(geojson && geojson.features) {

			console.log('Pub: tracksByPlace found in osm ',geojson.features.length);

			for(var i in geojson.features) {

				var feature = geojson.features[i];

				if( feature.properties.type==='way' &&
					feature.geometry.type==='LineString' ) {

					feature.id = feature.properties.id;

					var ret = Tracks.upsert({id: feature.id}, feature);

					imported += ret.numberAffected
				}
			}
		}
		
		console.log('Pub: tracksByPlace import from osm ',imported,'ways');

		tracksCur = K.findTracksByLoc(placeData.loc);

		console.log('Pub: tracksByPlace', placeId, tracksCur.count(),'tracks');

		return [
			placeCur,
			tracksCur
		];	
	}
	else
		this.ready();	
});