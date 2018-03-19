
Meteor.publish('poisByPlace', function(placeId) {

	if(this.userId) {

		var placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0];

		//var poisCur = findPoisByLoc(placeData.loc);
		//TODO optimize this condition caching
		//if(poisCur.count()===0) {

			var findOsm = function(loc) {
				return K.Osm.findOsmByLoc(loc, {
					filter: _.keys(K.settings.public.pois.typesByTags),
					dist: K.settings.public.pois.maxDistance,
					limit: K.settings.public.pois.limit
				});
			}

			var cachePrec = 4,
				cacheLoc = K.Util.geo.roundLoc(placeData.loc, cachePrec),
				geojson = null;

			if(K.settings.public.pois.caching)
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

			poisCur = findPoisByLoc(placeData.loc);
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