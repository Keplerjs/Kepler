
K.extend({
	updatePlaceGeoinfo: function(place) {
	
		console.log('Geoinfo: updatePlaceGeoinfo ', place.name);

		var ret = K.Geoinfo.getFieldsByLoc(place.loc);

		Places.update(place._id, {
			$set: {
				geoinfo: ret
			}
		});
	}
});

Places.after.insert(function(userId, doc) {
	if(doc.loc)
		K.updatePlaceGeoinfo(doc);
});

Places.after.update(function(userId, doc, fieldNames, modifier, options) {
	if(_.contains(fieldNames,'loc'))
		K.updatePlaceGeoinfo(doc);
});

Meteor.methods({
	findGeoinfoByLoc: function(loc, fields) {

		if(!this.userId && !K.Util.valid.loc(loc)) return null;

		console.log('Geoinfo: findGeoinfoByLoc...', loc);

		return K.Geoinfo.getFieldsByLoc(loc, fields);
	},
	findGeocoding: function(text) {

		if(!this.userId) return null;

		var ret = K.Geoinfo.getGeocoding(text);

		console.log('Geoinfo: findGeocoding', text, ret);

		return ret;
	}
});