
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
			loc = placeData.loc,
			imported = 0;

		//var tracksCur = findTracksByLoc(loc);
		//TODO optimize this condition caching
		//if(tracksCur.count()===0) {
			var findOsm = function(loc) {
				return K.Osm.findOsmByLoc(loc, {
					type: 'way',
					filter: _.keys(K.settings.public.tracks.typesByTags),
					dist: K.settings.public.tracks.maxDistance,
					limit: ' '//unlimit find way! cause nodes splitting
				});
			}

			var cachePrec = 2,
				cacheLoc = K.Util.geo.roundLoc(placeData.loc, cachePrec),
				geojson = null;

			if(K.settings.public.pois.caching)
				geojson = K.Cache.get(cacheLoc, 'tracks', findOsm);
			else
				geojson = findOsm(placeData.loc); 

			if(geojson && geojson.features) {

				console.log('Pub: tracksByPlace found in osm ',geojson.features.length);

				for(var i in geojson.features) {

					var feature = geojson.features[i];

					if( feature.properties.type==='way' &&
						feature.geometry.type==='LineString' ) {

						var ret = Tracks.upsert({id: feature.id}, feature);

						imported += ret.numberAffected
					}
				}
			}
			
			console.log('Pub: tracksByPlace import from osm ',imported,'ways');

			tracksCur = findTracksByLoc(placeData.loc);
		//}

		console.log('Pub: tracksByPlace', placeId, tracksCur.count(),'tracks');

		return [
			placeCur,
			tracksCur
		];	
	}
	else
		this.ready();	
});