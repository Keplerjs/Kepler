
K.extend({
	findPlaceById: function(placeId) {
		return Places.find(placeId, K.filters.placePanel);
	},
	findPlacesByIds: function(placesIds) {
		return Places.find({_id: {$in: placesIds} }, K.filters.placeItem);
	},
	findPlacesByCheckins: function(usersIds) {
		usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;
		return Places.find({checkins: usersIds }, K.filters.placeItem);
	},
	findCheckinsCountByPlaces: function(placesIds) {
		
		var places = K.findPlacesByIds(placesIds).fetch();

		return _.reduce(places, function(m, place) {
			return m + place.checkins.length;
		}, 0);
	},	
	findPlacesByBBox: function(bbox) {

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
					'$within': {
						'$box': bbox
					}
				}
			}, _.deepExtend({}, K.filters.placeItem, {
					limit: 50
				})
			);
		}
	},
	findPlacesByDate: function() {
		/*
		TODO may be unuseful
		var date = new Date();
			date.setDate(date.getDate() - 10),
			dateFrom = K.Util.time(date);
		*/
		return Places.find({
			/*createdAt: {
				'$gte': dateFrom
			}*/
		}, _.deepExtend({}, K.filters.placeItem, {
				sort: { createdAt: -1 },
				limit: 30
			})
		);
	},	
	findPlacesByNearby: function(loc) {
		return Places.find({
			loc: {
				'$near': loc,
				'$maxDistance': K.Util.geo.meters2rad(K.settings.public.map.nearbyMaxDist)
			}
		}, _.deepExtend({}, K.filters.placeItem, {
				limit: 30
			})
		);
	},
	findPlacesByName: function(initial) {
		initial = K.Util.sanitize.regExp(initial);

		if(!initial.length)
			return null;

		var filters = _.deepExtend({}, K.filters.placeSearch, {
			sort: { name:1 },
			limit: 30
		});

		var ex = new RegExp('^'+ initial, 'i');
			
		var curPlace = Places.find({
				$or: [
					{name: ex},
					{near: ex}
				] }, filters);

		if(curPlace.count()===0)
			curPlace = Places.find({prov: ex }, filters);
		
		if(curPlace.count()===0)
			curPlace = Places.find({reg: ex }, filters);

		return curPlace;
	}
});
