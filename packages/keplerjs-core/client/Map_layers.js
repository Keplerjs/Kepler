
_.extend(Kepler.Map, {

	_initLayers: function(map, opts) {

		var layers = {};

		layers.baselayer = new L.TileLayer(opts.layers[opts.layer]);

		layers.users = new L.LayerGroup();

		layers.cursor = new L.Cursor({
			className: 'marker-cursor'
		})
		layers.cursor.marker.on('add', function(e) {
			var div = L.DomUtil.create('div'),
				ll = this.getLatLng(),
				cursorData = {
					loc: [ll.lat, ll.lng]
				};
			Blaze.renderWithData(Template.popupCursor, cursorData, div);
			
			this.bindPopup(div.firstChild, opts.popup);
		});

		if(L.MarkerClusterGroup)
		layers.cluster = new L.MarkerClusterGroup({
			spiderfyDistanceMultiplier: 1.4,
			showCoverageOnHover: false,
			maxClusterRadius: 40,
			iconCreateFunction: function(clust) {

				clust.getCheckinsCount = function() {
					var placeIds = _.map(clust.getAllChildMarkers(), function(marker) {
						return marker.item.id;
					});
					return K.findCheckinsCountByPlaces(placeIds);
				};
				
				var div = L.DomUtil.create('div');
				
				Blaze.renderWithData(Template.markerCluster, clust, div);
				
				return new L.NodeIcon({
					className: 'marker-cluster',
					nodeHtml: div
				});
			}
		});

		layers.places = new L.LayerJSON({
			caching: false,
			layerTarget: layers.cluster,
			minShift: opts.bboxMinShift,
			callData: function(bbox, callback) {

				var sub = Meteor.subscribe('placesByBBox', bbox, function() {
					callback( K.findPlacesByBBox(bbox).fetch() );
				});

				return {
					abort: sub.stop
				};
			},
			propertyId: '_id',			
			dataToMarker: function(data) {	//eseguito una sola volta per ogni place
				var place= K.placeById(data._id),
					mark = place.marker;
				return mark;
			}
		});


		layers.geojson = new L.GeoJSON(null, {
			style: function (feature) {
				return opts.styles.default;
			},
			pointToLayer: function(feature, latlng) {	//costruisce marker POI

				var div = L.DomUtil.create('div');

				if(feature && feature.templateMarker && Template[feature.templateMarker]) {
					Blaze.renderWithData(Template[feature.templateMarker], feature, div);
				}

				return new L.Marker(latlng, {
						icon: new L.NodeIcon({
							className: feature.classMarker||'marker-geojson',
							nodeHtml: div.firstChild
						})
					});

			},
			onEachFeature: function (feature, layer) {
				if(feature && feature.templatePopup && Template[feature.templatePopup]) {
					var div = L.DomUtil.create('div','popup-geojson');
					Blaze.renderWithData(Template[feature.templatePopup], feature, div);
					layer.bindPopup(div, opts.popup);	
				}
			}
		});

		//autoclean geojson layer
		map.on('zoomend', function(e) {
			if(layers.geojson.getLayers().length) {
				if(e.target.getBoundsZoom(layers.geojson.getBounds()) - e.target.getZoom() > 1)
					layers.geojson.clearLayers();
			}
		});

		return layers;
	}
});