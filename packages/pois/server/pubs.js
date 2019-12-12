
Meteor.publish('poisByPlace', function(placeId) {

	if(this.userId || K.settings.public.router.publicRoutes.placePois) {

		var sets = K.settings.public.pois,
			tags = _.keys(K.Util.sets(sets.typesByTags)),
			placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0];

		var findOsm = function(loc) {
			return K.Osm.findByLoc(loc, {
				types: 'node',					
				tags: tags,
				dist: sets.maxDistance,
				limit: sets.limit,
				meta: false
			});
		}

		var cachePrec = 4,
			cacheLoc = K.Util.geo.locRound(placeData.loc, cachePrec),
			geojson = null;

		if(sets.caching)
			geojson = K.Cache.get(cacheLoc, 'pois', findOsm);
		else
			geojson = findOsm(placeData.loc);
		
		if(!geojson || !geojson.features)
			return [];

		for(var i in geojson.features) {
			var feature = geojson.features[i];

			Pois.upsert({id: feature.id}, {
				$set: feature
			});
		}

		console.log('Pub: poisByPlace insert from osm ', geojson.features.length);

		poisCur = K.findPoisByLoc(placeData.loc);

		console.log('Pub: poisByPlace', placeData.name, poisCur.count());

		return [
			placeCur,
			poisCur
		];	
	}
	else
		this.ready();	
});