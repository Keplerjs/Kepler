
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

		var sets = K.settings.public.tracks,
			placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0],
			loc = placeData.loc,
			imported = 0;

		//var tracksCur = K.findTracksByLoc(loc);
		//TODO optimize this condition caching
		//if(tracksCur.count()===0) {
			var findOsm = function(loc) {
				return K.Osm.findByLoc(loc, {
					type: 'way',
					tags: _.keys(sets.typesByTags),
					dist: sets.maxDistance,
					limit: sets.limit*2,//unlimit find way! cause nodes splitting,
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

						var ret = Tracks.upsert({id: feature.id}, feature);

						imported += ret.numberAffected
					}
				}
			}
			
			console.log('Pub: tracksByPlace import from osm ',imported,'ways');

			tracksCur = K.findTracksByLoc(placeData.loc);
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