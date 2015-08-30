/*
	layer geojson self clening on zoom out
*/
L.GeoJSONAutoClear = L.GeoJSON.extend({
	options: {
		zoomDiff: 2
	},
	onAdd: function(map) {
		L.GeoJSON.prototype.onAdd.call(this, map);
		var that = this,
			factor = 2;
		map.on('zoomend', function(e) {
			if( _.size(that._layers) )
				if(e.target.getZoom() < e.target.getBoundsZoom(that.getBounds())-factor)
					that.clearLayers();
		});
	}
});
