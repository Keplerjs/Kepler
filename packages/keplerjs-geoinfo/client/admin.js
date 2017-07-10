
K.Geoinfo = {
	marker: null
};

Router.onAfterAction(function() {

	if(K.Map.ready) {

		if(!K.Geoinfo.marker) {
			K.Geoinfo.marker = L.marker([0,0], {
				icon: L.divIcon({
					className: 'marker-geoinfo',
					iconSize: new L.Point(27, 30),
					iconAnchor: new L.Point(13, 30),
					popupAnchor: new L.Point(0, -30),
				})
			}).on('mousedown', function(e) {
				
				L.DomEvent.stopPropagation(e);

				var self = this,
					latlng = self.getLatLng(),
					loc = [latlng.lat, latlng.lng];

				if(!self._popup) {
					self.popup$ = L.DomUtil.create('div','');
					self.bindPopup(self.popup$, { closeButton: false, minWidth: 200});
				}

				self.popup$.innerHTML = '';
				Meteor.call('findGeoinfoByLoc', loc , function(err, data) {
					Blaze.renderWithData(Template.popupGeoinfo, data, self.popup$);
				});

			});
		}

		

		K.Map._map.on('click', function(e) {

			var loc = [e.latlng.lat, e.latlng.lng];

			if(K.Map._map.hasLayer(K.Geoinfo.marker))
				K.Map._map.removeLayer(K.Geoinfo.marker);
			else {

				K.Geoinfo.marker.addTo( K.Map._map ).setLatLng(loc);
			}
		});
	}
});