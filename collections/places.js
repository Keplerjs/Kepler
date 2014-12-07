
Places = new Meteor.Collection('falesie');

getPlacesByIds = function(placesIds) {
	placesIds = _.map(placesIds, function(id) {
		return new Meteor.Collection.ObjectID(id);
	});
	return Places.find({_id: {$in: placesIds} }, { fields: Climbo.perms.placeItem });
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
