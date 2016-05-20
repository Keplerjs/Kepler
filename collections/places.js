
Places = new Mongo.Collection('falesie', {
	/*transform: function(doc) {
		doc.loc = K.util.geo.roundLoc(doc.loc,3);
		return doc;
	}//*/
});

getPlaceById = function(placeId) {
	return Places.find({_id: new Mongo.Collection.ObjectID(placeId) }, { fields: K.fields.placePanel });
};

getPlacesByIds = function(placesIds) {
	placesIds = _.map(placesIds, function(id) {
		return new Mongo.Collection.ObjectID(id);
	});
	return Places.find({_id: {$in: placesIds} }, { fields: K.fields.placeItem });
};


getPlacesByCheckins = function(usersIds) {
	usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;
	
	return Places.find({checkins: usersIds }, { fields: K.fields.placeItem });
};

getPlacesByBBox = function(bbox) {

	//PATCH while minimongo not supporting $within $box queries
	if(Meteor.isClient) {

		var pp = _.filter(Places.find().fetch(), function(place) {

			return K.util.geo.contains(bbox, place.loc);
		});

		return {
			fetch: function() {
				return pp;
			}
		};
	}
	else if(Meteor.isServer) {
		return Places.find({
			loc: {
				"$within": {
					"$box": bbox
				}
			}
		}, { fields: K.fields.placeItem });
	}
};

getCheckinsCountByPlaces = function(placesIds) {
	
	var places = getPlacesByIds(placesIds).fetch();

	return _.reduce(places, function(m, place) {
		return m + place.checkins.length;
	}, 0);
};

getPlacesByName = function(initial) {
	initial = K.util.sanitizeRegExp(initial);

	if(initial.length < Meteor.settings.public.searchMinLen)
		return null;

	var ex = new RegExp('^'+ initial, 'i'),
		opts = {
			sort: { name:1, reg: 1},
			fields: K.fields.placeSearch,
			limit: Meteor.settings.public.searchMaxRes
		};
	
	var curPlace = Places.find({
			$or: [
				{name: ex},
				{near: ex}
			] }, opts);

	if(curPlace.count()===0)
		curPlace = Places.find({prov: ex }, opts);
	
	if(curPlace.count()===0)
		curPlace = Places.find({reg: ex }, opts);

	return curPlace;
};
