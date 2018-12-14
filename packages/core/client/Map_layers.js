
_.extend(Kepler.Map, {

	_initLayers: function(map, opts) {

		var self = this,
			optsDef = K.settings.public.map,
			layers = {};

		layers.baselayer = new L.TileLayer(opts.layers[opts.layer], {
			noWrap:true
		});

		layers.users = new L.LayerGroup();

		if(opts.cursor.enabled && L.Cursor) {
			
			layers.cursor = new L.Cursor();

			layers.cursor.marker.on('add', function(e) {

				var div = L.DomUtil.create('div'),
					ll = this.getLatLng(),
					loc = [ll.lat, ll.lng],
					cursorData = {
						loc: loc
					};
				
				//TODO rewrite use cursorData as reactive var!
				$(layers.cursor.icon.nodeHtml).empty();
				Blaze.renderWithData(Template.markerCursor, cursorData, layers.cursor.icon.nodeHtml);

				if(opts.popups.enabled || opts.cursor.popup) {
					Blaze.renderWithData(Template.popupCursor, cursorData, div);
					this.bindPopup(div.firstChild, opts.popups);
				}
			});
		}

		if(opts.layerPlaces.cluster && L.MarkerClusterGroup) {
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

					var icon = new L.NodeIcon({
						nodeHtml: div
					});

					return icon;
				}
			});
		}

		layers.places = new L.LayerJSON({
			caching: false,
			layerTarget: opts.layerPlaces.cluster && layers.cluster,
			minShift: opts.bboxMinShift,
			callData: function(bbox, callback) {
				
				//console.log('layer.places.callData',bbox)

				//TODO update underscore!
				//TODO refact using _.after()
	/*			if(!this._loaded) {
					this._loaded = 1;
					return;
				}*/

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
				return feature.style || opts.styles.default;
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
					var div = L.DomUtil.create('div','popup-geojson'),
						tmpl = Template[feature.templatePopup];
					
					Blaze.renderWithData(tmpl, feature, div);
					layer.bindPopup(div, opts.popups);	
				}
			}
		});

		map.on('zoomend moveend', function(e) {
			var c = map.getCenter(),
				z = map.getZoom();
				//autoOpen

			if(layers.geojson.getLayers().length) {
				if(e.target.getBoundsZoom(layers.geojson.getBounds()) - e.target.getZoom() > 2)
					layers.geojson.clearLayers();
			}

		    if(z < opts.dataMinZoom) {
		    	if(layers.users)
					map.removeLayer(layers.users);
				
				if(layers.cursor)
					map.removeLayer(layers.cursor);
				
				if(layers.cluster)
					map.removeLayer(layers.cluster);
		    }
		    else {
		    	if(layers.users)
					map.addLayer(layers.users);
				
				if(layers.cursor)
					map.addLayer(layers.cursor);
				
				if(layers.cluster)
					map.addLayer(layers.cluster);

				/* TODO FIX if(opts.tooltips.autoOpen) {
					var bb = map.getBounds().pad(-0.7);
					L.rectangle(bb).addTo(map);
					
					layers.cluster.eachLayer(function(l) {
						
						if(bb.contains(l.getLatLng())){
							console.log(l);
							l.openTooltip();
						}
					});
				}*/
		    }
		});

		return layers;
	}
});