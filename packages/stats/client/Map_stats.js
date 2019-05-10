
Tracker.autorun(function(comp) {

	if(K.Map.ready()) {

		var placesLayer = L.geoJSON([], {
			pointToLayer: function(point, loc) {
				var r = point.properties.rank;
				r = Math.min(r, 15);
				r = Math.max(r, 5);
				return L.circleMarker(loc, {radius: r }).on('click', function(e) {
					L.DomEvent.stopPropagation(e);
					K.Map.map.removeLayer(placesLayer);
					K.Map.map.flyTo(loc, K.settings.public.map.dataMinZoom+1, {
						duration: 1
					})
				});
			},
			style: K.settings.public.stats.mapStyle
		});

		K.Map.map.on('zoomend', function(e) {
			var z = K.Map.map.getZoom();

			if(z < K.settings.public.map.dataMinZoom) {
			
				if(!placesLayer.getLayers().length)
				{
					Meteor.call('findPlacesStats', function(err, geojson) {

						placesLayer.addData(geojson);
					});				
				}

				K.Map.map.addLayer(placesLayer);
			}
			else
				K.Map.map.removeLayer(placesLayer);
		})
		.fire('zoomend');
		//TODO REFACT!!
	}

});