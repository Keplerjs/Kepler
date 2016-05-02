/*
	mostra vsta streetview della falesia dal suo parcheggio

	richiede: mrt add googlemaps-server

	doc:
	https://github.com/moshen/node-googlemaps
	https://github.com/moshen/node-googlemaps/blob/master/test/streetview-test.js

	esempi:
	http://stackoverflow.com/questions/4001386/google-maps-api-v3-nearest-streetview
	http://www.dreamdealer.nl/tutorials/point_the_streetview_camera_to_a_marker.html
	
	TODO se non ce la vista dal parcheggio provare dal punto streetview piu vicino 
*/

Meteor.methods({
	getStreetViewById: function(placeId) {
		
		console.log("getStreeViewById()",placeId);

		var url = "http://maps.googleapis.com/maps/api/streetview?"+
		 		"size=200x200&location={loc}&sensor=false";

		var place = getPlaceById(placeId).fetch()[0],
			lastP = place.loc;

		if(place.tracks>0) {
			var track = getTracksByIds(place.tracks).fetch()[0],
				firstP = track.features[0].geometry.coordinates[0].reverse();
		}
		//TODO calcolare angolo e inclinazione da fisrtP a lastP

// // http://code.google.com/apis/maps/documentation/streetview
// exports.streetView = function(size, location, callback, sensor, heading, fov, pitch) {


		return googlemaps.streetView('250x200', lastP.join(','),false);

		// ll = K.util.geo.roundLoc(ll, 8);
		// var key = parseInt(K.util.timeUnix()/(60*60*24*1))+'_'+ll.join('_');	//daily hash
		// var val = K.cache.get('meteo', key );
		// return val || K.cache.set('meteo', key, meteoAPI(ll) );
/*
function computeAngle(endLatLng, startLatLng) {
      var DEGREE_PER_RADIAN = 57.2957795;
      var RADIAN_PER_DEGREE = 0.017453;
 
      var dlat = endLatLng.lat() - startLatLng.lat();
      var dlng = endLatLng.lng() - startLatLng.lng();
      // We multiply dlng with cos(endLat), since the two points are very closeby,
      // so we assume their cos values are approximately equal.
      var yaw = Math.atan2(dlng * Math.cos(endLatLng.lat() * RADIAN_PER_DEGREE), dlat)
             * DEGREE_PER_RADIAN;
      return wrapAngle(yaw);
   }
 
   function wrapAngle(angle) {
    if (angle >= 360) {
        angle -= 360;
    } else if (angle < 0) {
        angle += 360;
    }
    return angle;
    };
*/
	}
});
