
//TODO using before instead after!!!
Places.before.insert(function(userId, doc) {
	if(K.settings.geoinfo && K.settings.geoinfo.autoupdate) {
		console.log('Geoinfo: updatePlaceGeoinfo ', doc.name);
		doc.geoinfo = K.Geoinfo.getFieldsByLoc(doc.loc)
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

			Places.update(placeId, {
				$set: {
					geoinfo: K.Geoinfo.getFieldsByLoc(placeData.loc)
				}
			});

			console.log('Edit: updatePlaceGeoinfo', placeId);			
		}	
	}
});