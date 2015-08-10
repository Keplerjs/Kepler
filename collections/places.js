
Places = new Meteor.Collection('falesie');

getPlacesByIds = function(placesIds) {
	placesIds = _.map(placesIds, function(id) {
		return new Meteor.Collection.ObjectID(id);
	});
	return Places.find({_id: {$in: placesIds} }, { fields: Climbo.perms.placeItem });
};

getPlacesByBBox = function(bbox) {

	//PATCH while minimongo not supporting $within $box queries
	if(Meteor.isClient && L) {


		console.log('getPlacesByBBox',bbox);

		return {
				fetch: function() {
					return Places.find().fetch();
				}
			};

/*		var pp = _.filter(Places.find().fetch(), function(place) {

			return Climbo.util.geo.contains(bbox, place.loc);
		});

		console.log('getPlacesByBBox',pp);
		return pp;*/
	}
	else if(Meteor.isServer) 
		return Places.find({loc: {"$within": {"$box": bbox }} }, { fields: Climbo.perms.placeMarker });
};

getCheckinsCountByPlaces = function(placesIds) {
	
	var places = getPlacesByIds(placesIds).fetch();

	return _.reduce(places, function(m, place) {
		return m + place.checkins.length;
	}, 0);
};

getPlacesByName = function(initial) {
	initial = Climbo.util.sanitizeRegExp(initial);

	if(initial.length < Meteor.settings.public.searchMinLen)
		return null;

	var reg = new RegExp('^'+ initial, 'i'),
		curPlace = Places.find({$or: [
				{name: reg},
				{near: reg}
			] }, { fields: Climbo.perms.placeSearch });

	if(curPlace.count()===0)
		curPlace = Places.find({
				prov: reg
			}, { fields: Climbo.perms.placeSearch });
	
	if(curPlace.count()===0)
		curPlace = Places.find({
				reg: reg
			}, { fields: Climbo.perms.placeSearch });

	return curPlace;
};
