
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

	var place = {
		name: name, //K.Util.sanitizeName(name),
		loc: coords.reverse(),
		active: 0,
		osm: feature,
		source: {
			type: 'osm'
		}
	};
	
	return place;
};

Meteor.methods({
	insertPlaceByOsmId: function(osmId) {

		if(!this.userId) return null;

		var obj = Meteor.call('findOsmById', osmId);
		
		if(!obj) return null;

		var placeData = osmToPlace(obj);
		
		var placeId = Meteor.call('insertPlace', placeData);
		
		console.log('Osm: insertPlaceByOsmId', osmId);

		return placeId;
	}
});
