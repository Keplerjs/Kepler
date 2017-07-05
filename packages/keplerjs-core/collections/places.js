
Places = new Mongo.Collection('places');

K.queries({
	findPlaceById: function(placeId) {
		return Places.find(placeId, { fields: K.Field.placePanel });
	},
	findPlacesByIds: function(placesIds) {
		return Places.find({_id: {$in: placesIds} }, { fields: K.Field.placeItem });
	},
	findPlacesByCheckins: function(usersIds) {
		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;
		
		return Places.find({checkins: usersIds }, { fields: K.Field.placeItem });
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
			}, { fields: K.Field.placeItem });
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

		var ex = new RegExp('^'+ initial, 'i'),
			opts = {
				sort: { name:1, reg: 1},
				fields: K.Field.placeSearch,
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
	}
});


//Places.allow({
//TODO limt hist size
//http://stackoverflow.com/questions/21466297/slice-array-in-mongodb-after-addtoset-update
// $addToSet: {
// 	checkins: this.userId,
// 	hist: { $each: [this.userId], $slice: Meteor.settings.public.maxHist }
// }
//TODO
// $addToSet: {
// 	hist: { $each: [placeId], $slice: Meteor.settings.public.maxHist }
// }
