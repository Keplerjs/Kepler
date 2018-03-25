
Meteor.publish('placesByBBox', function(bbox) {
	if(this.userId) {
		var diag = K.Util.geo.distance(bbox[0],bbox[1]);

		//console.log('Pub: placesByBBox ', diag);

		if(diag < K.settings.public.map.bboxMaxDiagonal) {
			var cur = K.findPlacesByBBox(bbox);
			console.log('Pub: placesByBBox ', this.userId, cur.count());
			return cur;
		}
		else
			this.ready();
	}
	else
		this.ready();
});

Meteor.publish('placesByName', function(initial) {
	if(this.userId) {
		var cur = K.findPlacesByName(initial);
		console.log('Pub: placesByName', initial, cur ? cur.count() : 0 );
		return cur;
	}
	else
		this.ready();	
});

Meteor.publish('placeById', function(placeId) {
	if(this.userId) {
		var placeCur = K.findPlaceById(placeId),
			placeData = placeCur.fetch()[0],
			retCurs = [];

		retCurs.push(placeCur);
		
		if(!placeData)
			return retCurs;

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
	if(this.userId) {
		console.log('Pub: placesByIds');
		return K.findPlacesByIds(placesIds);	
	}
	else
		this.ready();	
});

Meteor.publish('placesByDate', function() {
	if(this.userId) {
		console.log('Pub: placesByDate');
		return K.findPlacesByDate();
	}
	else
		this.ready();
});

Meteor.publish('placesByNearby', function(loc) {
	if(this.userId) {
		console.log('Pub: placesByNearby',loc);
		if(K.Util.valid.loc(loc))
			return K.findPlacesByNearby(loc);
	}
	else
		this.ready();
});