
Tracker.autorun(function(comp) {

	if(K.Map.ready()) {

		var statsLayer = L.geoJSON([], {
			pointToLayer: function(point, loc) {
				var r = point.properties.rank;
				r *= 1.2;
				r = Math.min(r, 40);
				r = Math.max(r, 4);
				return L.circleMarker(loc, {radius: r })
			},
			style: {
				weight:2,
				opacity:1,
				fillOpacity:0.9,
				fillColor:'#9c0',
				color:'#7a0'
			}
		});

		K.Map.map.on('zoomend', function(e) {
			var z = K.Map.map.getZoom();

			if(z < K.settings.public.map.dataMinZoom){
			
				if(!statsLayer.getLayers().length)
					Meteor.call('findPlacesStats', function(err, geojson) {
						statsLayer.addData(geojson);
					});

				K.Map.map.addLayer(statsLayer);
			}
			else
				K.Map.map.removeLayer(statsLayer);
		});
	}

});