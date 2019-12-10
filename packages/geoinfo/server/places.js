
Places.after.insert(function(userId, doc) {
	if(K.settings.geoinfo && K.settings.geoinfo.autoupdate) {

		//TODO add async random delay
		//
		K.Geoinfo.getFieldsByLoc(doc.loc, function(geo) {
			Places.update(doc._id, {
				$set: {
					geoinfo: geo
				}
			});
		});
	}
});

Places.after.update(function(userId, doc, fieldNames, modifier, options) {

	if(K.settings.geoinfo && K.settings.geoinfo.autoupdate) {
		if( _.contains(fieldNames,'loc') //||_.contains(fieldNames,'geometry'))
		 	&& modifier.$set && modifier.$set.loc) {
			
			if(doc.geoinfo && !_.contains(fieldNames,'geoinfo')) {
				K.Geoinfo.getFieldsByLoc(doc.loc, function(geo) {
					Places.update(doc._id, {
						$set: {
							geoinfo: geo
						}
					});
				});
			}
		}
	}
});

Meteor.methods({
	updatePlaceGeoinfo: function(placeId) {
		
		if(!this.userId) return null;

		var placeData = Places.findOne(placeId),
			userId = placeData.userId || null;
		
		if(userId === this.userId || (K.Admin && K.Admin.isMe())) {

			var geoinfo = K.Geoinfo.getFieldsByLoc(placeData.loc);

			Places.update(placeId, {
				$set: {
					geoinfo: geoinfo
				}
			});

			console.log('Geoinfo: updatePlaceGeoinfo', placeId);

			return geoinfo;
		}	
	}
});
