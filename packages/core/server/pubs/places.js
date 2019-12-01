
Meteor.publish('placesByBBox', function(bbox, query) {

	if( (this.userId || K.settings.public.router.publicRoutes.map) &&
		K.Util.geo.distance(bbox[0],bbox[1]) < K.settings.public.map.bboxMaxDiagonal )
		return K.findPlacesByBBox(bbox, query);
	else
		this.ready();
});

Meteor.publish('placesByName', function(initial) {
	if(this.userId || K.settings.public.router.publicRoutes.places) {
		var cur = K.findPlacesByName(initial);
		console.log('Pub: placesByName', initial, cur ? cur.count() : 0 );
		return cur;
	}
	else
		this.ready();	
});

Meteor.publish('placesByText', function(text) {
	if(this.userId || K.settings.public.router.publicRoutes.places) {
		var cur = K.findPlacesByText(text);
		console.log('Pub: placesByText', text, cur ? cur.count() : 0 );
		return cur;
	}
	else
		this.ready();	
});

Meteor.publish('placeById', function(placeId) {
	if(this.userId || K.settings.public.router.publicRoutes.panelPlace) {
		var placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0],
			retCurs = [];

		retCurs.push(placeCur);
		
		if(!placeData) {
			return retCurs;
		}

		var usersIds = _.union(placeData.hist, placeData.checkins, placeData.userId);
		//TODO move publish of userId in plugin edit
		//		
		if(usersIds.length > 0)
			retCurs.push( K.findUsersByIds(usersIds) );
		//publish one cursor for collection users

		return retCurs;
	}
	else
		this.ready();	
});

Meteor.publish('placesByIds', function(placesIds) {
	if(this.userId || K.settings.public.router.publicRoutes.places) {
		console.log('Pub: placesByIds');
		return K.findPlacesByIds(placesIds);	
	}
	else
		this.ready();	
});

Meteor.publish('placesByDate', function() {
	if(this.userId || K.settings.public.router.publicRoutes.placesNews) {
		console.log('Pub: placesByDate');
		return K.findPlacesByDate();
	}
	else
		this.ready();
});

Meteor.publish('placesByNearby', function(loc) {
	if(this.userId || K.settings.public.router.publicRoutes.placesNearby) {
		console.log('Pub: placesByNearby',loc);
		if(K.Util.valid.loc(loc))
			return K.findPlacesByNearby(loc);
	}
	else
		this.ready();
});

Meteor.publish('placeGeometryById', function(placeId) {
	if(this.userId || K.settings.public.router.publicRoutes.placeGeom) {
		return K.findPlaceGeometryById(placeId);
	}
	else
		this.ready();	
});