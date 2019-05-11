
Meteor.publish('poisByPlace', function(placeId) {

	if(this.userId) {

		var sets = K.settings.public.pois,
			placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0];

		//var poisCur = K.findPoisByLoc(placeData.loc);
		//TODO optimize this condition caching
		//if(poisCur.count()===0) {

			var findOsm = function(loc) {
				return K.Osm.findByLoc(loc, {
					filter: _.keys(sets.typesByTags),
					dist: sets.maxDistance,
					limit: sets.limit,
					meta: false
				});
			}

			var cachePrec = 4,
				cacheLoc = K.Util.geo.roundLoc(placeData.loc, cachePrec),
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
		//}

		console.log('Pub: poisByPlace', placeData.name, poisCur.count());

		return [
			placeCur,
			poisCur
		];	
	}
	else
		this.ready();	
});