
K.queries({
	findPlaceById: function(placeId) {
		return Places.find(placeId, K.filter.placePanel);
	},
	findPlacesByIds: function(placesIds) {
		return Places.find({_id: {$in: placesIds} }, K.filter.placeItem);
	},
	findPlacesByCheckins: function(usersIds) {
		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;
		
		return Places.find({checkins: usersIds }, K.filter.placeItem);
	},
	findPlacesByBBox: function(bbox) {

		//TODO limit bbox sizes!!! add limit

		//PATCH while minimongo not supporting $within $box queries
		if(Meteor.isClient) {

			var pp = _.filter(Places.find().fetch(), function(place) {

				return K.Util.geo.contains(bbox, place.loc);
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
			}, K.filter.placeItem);
		}
	},
	findCheckinsCountByPlaces: function(placesIds) {
		
		var places = K.findPlacesByIds(placesIds).fetch();

		return _.reduce(places, function(m, place) {
			return m + place.checkins.length;
		}, 0);
	},
	findPlacesByName: function(initial) {
		initial = K.Util.sanitizeRegExp(initial);

		if(initial.length < Meteor.settings.public.searchMinLen)
			return null;

		var ex = new RegExp('^'+ initial, 'i');
			
		var curPlace = Places.find({
				$or: [
					{name: ex},
					{near: ex}
				] }, K.filter.placeSearch);

		if(curPlace.count()===0)
			curPlace = Places.find({prov: ex }, K.filter.placeSearch);
		
		if(curPlace.count()===0)
			curPlace = Places.find({reg: ex }, K.filter.placeSearch);

		return curPlace;
	}
});
