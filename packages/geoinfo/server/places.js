
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