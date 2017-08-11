
Meteor.publish('poisByPlace', function(placeId) {

	if(this.userId) {

		var placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0];

		var poisCur = findPoisByLoc(placeData.loc);

		if(poisCur.count()===0) {
			var geojson = K.Osm.findOsmByLoc(placeData.loc, {
				filter: _.keys(K.settings.public.pois.typesByTags),
				radius: 200,
				limit: 10,
				meta: false
			});
			
			if(!geojson || !geojson.features)
				return [];

			for(var i in geojson.features) {
				var feature = geojson.features[i];

				Pois.upsert({id: feature.id}, {
					$set: feature
				});
			}
			console.log('Pub: poisByPlace insert from osm ', geojson.features.length);
		}

		console.log('Pub: poisByPlace', placeData.name, poisCur.count());

		return [
			placeCur,
			poisCur
		];	
	}
	else
		this.ready();	
});