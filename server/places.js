
newPlaceByLoc = function(loc) {

	var placeData = _.extend(K.schemas.place, {
			loc: loc
		}),
		placeId = Places.insert(placeData);

	updatePlaceLoc(placeId, loc);

	console.log('newPlaceByLoc', loc, placeId);

	return placeId;
};

updatePlaceLoc = function(placeId, loc)	{
	
	if(!K.admin.isMe()) return null;
	
	async.parallel({
		loc: function(cb) {
			Meteor.setTimeout(function() {
				cb(null, K.util.geo.roundLoc(loc) );
			},0);
		},
		esp: function(cb) {
			Meteor.setTimeout(function() {
		 		cb(null, K.geoapi.aspect(loc) );
		 	},0);
		},
		ele: function(cb) {
			Meteor.setTimeout(function() {
		 		cb(null, K.geoapi.elevation(loc) );
		 	},0);
		},
		near: function(cb) {
			Meteor.setTimeout(function() {
		 		cb(null, K.geoapi.near(loc) );
		 	},0);
		},
		com: function(cb) {
			Meteor.setTimeout(function() {
		 		cb(null, K.geoapi.municipality(loc) );
		 	},0);
		},
		prov: function(cb) {
			Meteor.setTimeout(function() {
		 		cb(null, K.geoapi.province(loc) );
		 	},0);
		},
		reg: function(cb) {
			Meteor.setTimeout(function() {
		 		cb(null, K.geoapi.region(loc) );
		 	},0);
		}
	},
	function(err, results) {
		Places.update(placeId, {
			$set: results
		});
		console.log('updatePlaceLoc',results);
	});
};

Meteor.methods({
	newPlaceByLoc: function(loc) {

		if(!this.userId || !K.util.valid.loc(loc)) return null;

		return newPlaceByLoc(loc);
	}
});
