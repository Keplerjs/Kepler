
K.Map.stats = {
	update: function(e) {
		
		var bbox = K.Map.getBBox(),
			z = K.Map.map.getZoom();

		//L.rectangle(bbox,{style:{opacity:.25}}).addTo(K.Map.map)

		if(z < K.settings.public.map.dataMinZoom) {
			
			K.Map.map.addLayer(K.Map.layers.stats);

			if(K.Map.layers.stats.getLayers().length===0) {
				Meteor.call('findStatsPlacesByGeo', bbox, function(err, geojson) {

					//console.log(bbox.toString(), geojson.features.length)
					K.Map.layers.stats.clearLayers();
					K.Map.layers.stats.addData(geojson);
				});		
			}
			
		}
		else
			K.Map.map.removeLayer(K.Map.layers.stats);
	}
}

Tracker.autorun(function(comp) {

	if(K.Map.ready()) {

		if(!K.Map.layers.stats) {
			K.Map.layers.stats = L.geoJSON([], {
				pointToLayer: function(point, loc) {
					var r = point.properties.rank;
					var radius = Math.min(r, 15);
						radius = Math.max(r, 5);
					return L.circleMarker(loc, {
							radius: radius
					}).on('click', function(e) {
						L.DomEvent.stopPropagation(e);
						K.Map.map.removeLayer(K.Map.layers.stats);
						K.Map.map.flyTo(loc, K.settings.public.map.dataMinZoom+1, {
							duration: 1
						})
					});
				},
				style: K.settings.public.stats.mapStyle
			});
		}

		K.Map.map.on('zoomend', K.Map.stats.update);

		K.Map.stats.update();
	}

});