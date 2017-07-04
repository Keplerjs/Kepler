
K.Admin.addMethods({
	updateGeoinfo: function(placeId) {
	
		if(!K.Admin.isMe()) return null;
		
		async.parallel({
			esp: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoinfo.aspect(loc) );
			 	},0);
			},
			ele: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoinfo.elevation(loc) );
			 	},0);
			},
			near: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoinfo.near(loc) );
			 	},0);
			},
			com: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoinfo.municipality(loc) );
			 	},0);
			},
			prov: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoinfo.province(loc) );
			 	},0);
			},
			reg: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoinfo.region(loc) );
			 	},0);
			}
		},
		function(err, results) {
			Places.update(placeId, {
				$set: results
			});
			console.log('updateGeoinfo',results);
		});
	}
});