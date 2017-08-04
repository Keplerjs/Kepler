
/* OSM data structure
{
   "type":"Feature",
   "id":"node/3517622759",
   "properties":{
      "type":"node",
      "id":3517622759,
      "tags":{
         "amenity":"restaurant",
         "email":"bombayraj45@yahoo.it",
         "name":"ristorante indiano Bombay palace",
         "phone":"+39 067001945",
         "website":"http://www.restaurantindianobombay.com/#_=_"
      },
      "relations":[],
      "meta":{}
   },
   "geometry":{
      "type":"Point",
      "coordinates":[12.5123636,41.8814402]
   },
   "templatePopup":"popupGeojson_osm"
}
*/
var osmToPlace = function(osm) {

	var feature = osm.features[0],
		prop = feature.properties,
		coords = feature.geometry.coordinates;

	var name = prop.tags.name || '';//K.Util.timeName('osm '+prop.id)

	var place = _.deepExtend(K.schemas.place, {
		name: name, //K.Util.sanitizeName(name),
		loc: K.Util.geo.roundLoc(coords.reverse()),
		active: 0,
		osm: feature,
		source: {
			type: 'osm'
		}
	});
	
	return place;
};

Meteor.methods({
	insertPlaceByOsmId: function(osmId) {

		if(!this.userId) return null;

		console.log('Osm: insertPlaceByOsmId ',osmId)

		var obj = Meteor.call('findOsmById', osmId);

		var placeData = osmToPlace(obj),
			placeId = Places.insert(placeData);
		
		console.log('Osm: insertPlaceByOsmId', placeId, placeData.name);

		return placeId;
	}
});
