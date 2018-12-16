
//TODO using before instead after!!!
/*Places.before.insert(function(userId, doc) {
	if(K.settings.geoinfo && K.settings.geoinfo.autoupdate) {
		console.log('Geoinfo: updatePlaceGeoinfo ', doc.name);
		doc.geoinfo = K.Geoinfo.getFieldsByLoc(doc.loc)
	}
});*/
Places.after.insert(function(userId, doc) {
	if(K.settings.geoinfo && K.settings.geoinfo.autoupdate) {

		K.Geoinfo.getFieldsByLoc(doc.loc, function(geo) {

			console.log('Geoinfo: getFieldsByLoc ', doc.name);

			Places.update(doc._id, {
				$set: {
					geoinfo: geo
				}
			});
		});
	}
});
/*

//TODO uncomment whe edit plugin support moving place
Places.before.update(function(userId, doc, fieldNames, modifier, options) {
	if(_.contains(fieldNames,'loc'))
		doc.geoinfo = K.Geoinfo.getFieldsByLoc(doc.loc)
});
*/

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