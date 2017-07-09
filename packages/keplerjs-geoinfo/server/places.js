
//doc of before.insert in https://github.com/matb33/meteor-collection-hooks
Places.after.insert(function(userId, doc) {
	K.updatePlaceGeoinfo(doc);
});

Places.after.update(function(userId, doc, fieldNames, modifier, options) {
	if(_.contains(fieldNames,'loc'))
		K.updatePlaceGeoinfo(doc);
});

K.extend({
	updatePlaceGeoinfo: function(place) {
	
		if(!K.Admin.isMe()) return null;
		
		console.log('updatePlaceGeoinfo...', place.name);

		async.parallel({
			loc: function(cb) {
			 	cb(null, place.loc);
			},
			esp: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.aspect(place.loc) );
			 	},0);
			},
			ele: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.elevation(place.loc) );
			 	},0);
			},
			near: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.near(place.loc) );
			 	},0);
			},
			com: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.municipality(place.loc) );
			 	},0);
			},
			prov: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.province(place.loc) );
			 	},0);
			},
			reg: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.region(place.loc) );
			 	},0);
			}
		},
		function(err, results) {
			Places.update(place._id, {
				$set: {geoinfo: results}
			});
			console.log('updatePlaceGeoinfo', place.name, results);
		});
	}
});
