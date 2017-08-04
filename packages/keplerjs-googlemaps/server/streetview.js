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
	findStreetViewById: function(placeId) {
		
		console.log("getStreeViewById()",placeId);

		var url = "http://maps.googleapis.com/maps/api/streetview?"+
		 		"size=200x200&location={loc}&sensor=false";

		var place = K.findPlaceById(placeId).fetch()[0],
			lastP = place.loc;

		/*if(place.tracks>0) {
			var track = getTracksByIds(place.tracks).fetch()[0],
				firstP = track.features[0].geometry.coordinates[0].reverse();
		}*/
		//TODO calcolare angolo e inclinazione da fisrtP a lastP

		//// http://code.google.com/apis/maps/documentation/streetview
		//size, location, callback, sensor, heading, fov, pitch
		var res = Googlemaps.streetView('250x200', lastP.join(','), false);

		return res;
	}
});
