
K.Admin.methods({
	updateGeoinfo: function(placeId) {
	
		if(!K.Admin.isMe()) return null;
		
		async.parallel({
			esp: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.aspect(loc) );
			 	},0);
			},
			ele: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.elevation(loc) );
			 	},0);
			},
			near: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.near(loc) );
			 	},0);
			},
			com: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.municipality(loc) );
			 	},0);
			},
			prov: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.province(loc) );
			 	},0);
			},
			reg: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.Geoinfo.region(loc) );
			 	},0);
			}
		},
		function(err, results) {
			Places.update(placeId, {
				$set: results
				//TODO replace with {geo: results}
			});
			console.log('updateGeoinfo',results);
		});
	}
});