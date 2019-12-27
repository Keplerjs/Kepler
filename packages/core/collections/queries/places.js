
K.extend({
	findPlaceById: function(placeId) {
		return Places.find(placeId, K.filters.placePanel);
	},
	findPlacesByIds: function(placesIds) {
		
		placesIds = _.isArray(placesIds) ? {$in: placesIds} : placesIds;

		return Places.find({_id: placesIds }, K.filters.placeItem);
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
	findPlacesByBBox: function(bbox, queryname) {

		//TODO move in public
		var query = K.queries[queryname] || {};

		let sel = _.isFunction(query) ? query() : query;
		//PATCH while minimongo not supporting $within $box queries
		if(Meteor.isClient) {
			
			//console.log('QUERY findPlacesByBBox', sel)

			let pp = _.filter(Places.find(sel).fetch(), function(place) {
				return K.Util.geo.bboxContains(bbox, place.loc);
			});

			return {
				fetch: function() {
					return pp;
				}
			};
		}
		else if(Meteor.isServer) {

			_.deepExtend(sel, {
				loc: {
					'$within': {
						'$box': bbox
					}
				}
			});

			return Places.find(sel, _.deepExtend({}, K.filters.placeItem, {
					limit: K.settings.public.map.bboxMaxResults
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
				limit: 20
			})
		);
	},	
	findPlacesByNearby: function(loc, dist) {
		
		dist = dist || K.settings.public.map.nearbyMaxDist;

		//TODO https://forums.meteor.com/t/mongodb-geonear-query-and-match-aggregation-return-empty-result/36948
		////sort by distance
		///
		return Places.find({
			loc: {
				'$near': loc,
				'$maxDistance': K.Util.geo.meters2rad(dist)
			}
		}, _.deepExtend({}, K.filters.placeItem, {
				limit: 20
			})
		);
	},
	findPlacesByName: function(initial) {
		initial = K.Util.sanitize.regExp(initial);

		if(!initial.length)
			return null;

		var filters = _.deepExtend({}, K.filters.placeSearch, {
			sort: { name:1 },
			limit: 20
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
	},
	findPlacesByText: function(text) {

		//https://www.okgrow.com/posts/guide-to-full-text-search-in-meteor
		//WORKAROUND https://www.okgrow.com/posts/guide-to-full-text-search-in-meteor
		
	    text = K.Util.sanitize.regExp(text);

		if(!text.length)
			return null;

		var curPlace;

		if(Meteor.isClient) {

			var filters = _.deepExtend({}, K.filters.placeSearch, {
				fields: {
					score: 1
				},
				sort: { score:1 },
				limit: 20
			});

			curPlace = Places.find({
					name: new RegExp(text, 'i'),
					score: {
						$exists: true
					}
				}, filters);
		}
		else if(Meteor.isServer) {

			var filters = _.deepExtend({}, K.filters.placeSearch, {
				fields: {
					score: {
						$meta: "textScore"
					}
				},
				sort: {
					score: {
						$meta: "textScore"
					}
				},
				limit: 20
			});

			curPlace = Places.find({
					$text: {
						$search: text,
						//$language: 'it',
						//$diacriticSensitive: true
					}
				}, filters);

			if(curPlace.count()===0) {
				curPlace = Places.find({
					name: new RegExp(text, 'i')
				}, filters);
			}
		}
		/*
		if(curPlace.count()===0)
			curPlace = Places.find({prov: ex }, filters);
		
		if(curPlace.count()===0)
			curPlace = Places.find({reg: ex }, filters);*/

		return curPlace;
	},
	findPlaceGeometryById: function(placeId) {
		
		if(!placeId) return null;

		var curPlace = Places.find(placeId, {
			fields: {
				geometry: 1
			}
		});

		return curPlace;
	},
	insertCheckin: function(placeId, userId) {

		if(!userId || !placeId) return null;

		var placeData = Places.findOne(placeId),
			userData = Users.findOne(userId);

 		if(userData.checkin)
 			Places.update(userData.checkin, {
 					$pull: {
 						checkins: userId
 					}
 				});

		Places.update(placeId, {
				$addToSet: {
					checkins: userId,
					hist: userId
				}
			});

		Users.update(userId, {
				$set: {
					checkin: placeId,
					loc: null,
					loclast: placeData.loc,
					'settings.map.center': placeData.loc,
					'settings.map.zoom': K.settings.public.map.showLocZoom
				},
				$addToSet: {
					hist: placeId
					
				//TODO limiti hist length
				////https://stackoverflow.com/questions/21466297/slice-array-in-mongodb-after-addtoset-update
				}
			});
	},
	removeCheckin: function(placeId, userId) {

		if(!userId || !placeId) return null;

		Places.update(placeId, {
				$pull: {
					checkins: userId
				}
			});
		Users.update(userId, {
				$set: {
					checkin: null
				}
			});
	}
});
