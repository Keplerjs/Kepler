
_.extend(Kepler.Map, {

	_initLayers: function(map, opts) {

		var self = this,
			optsDef = K.settings.public.map,
			layers = {};
		/**
		 * base tilelayer by user settings
		 * @type {L}
		 */
		layers.baselayer = new L.TileLayer(opts.layers[opts.layer], {
			noWrap:true,
			maxZoom: optsDef.maxZoom,
			maxNativeZoom: 18
		});
		/*map.on('zoomend', function(e) {
			console.log(e.target.getZoom())
		});*/
		/**
		 * marker users
		 * @type {L}
		 */
		layers.users = new L.LayerGroup();
		/**
		 * places geometries
		 * @type {L}
		 */
		layers.geometries = new L.LayerGroup();

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
			layers.cluster = new L.MarkerClusterGroup(
				_.extend({}, optsDef.layerPlaces.clusterOpts, {
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
				})
			);
		}

		//layers.places = new L.LayerGroup();
		layers.places = new L.LayerJSON({
			
			layerTarget: opts.layerPlaces.cluster && layers.cluster,
			
			caching: false,
			minShift: opts.bboxMinShift,
			callData: function(bbox, callback) {

				var query = self.options.query;
				//TODO conver in reactive to able reload sub

				//console.log('map query',query);

				var sub = Meteor.subscribe('placesByBBox', bbox, query, function() {
					//console.log('sub placesByBBox',bbox)
					callback( K.findPlacesByBBox(bbox, query).fetch() );
				});

				return {
					abort: sub.stop
				};
			},
			propertyId: '_id',
			dataToMarker: function(data) {	//eseguito una sola volta per ogni place
				var place = K.placeById(data._id);
				return place.marker;
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
					
					feature.layer = layer;

					Blaze.renderWithData(tmpl, feature, div);
					layer.bindPopup(div, opts.popups);	
				}
			}
		});

		var zoomData = _.once(function (e) {
			K.Alert.warning( i18n('error_nozoomdata') );
		});

		map.on('click', function(e) {
			if( e.target.getZoom() < opts.dataMinZoom )
				zoomData();
		});

		map.on('zoomend moveend', function(e) {
			var c = e.target.getCenter(),
				z = e.target.getZoom();
				//autoOpen

			if( layers.geojson.getLayers().length &&
				z >= opts.dataMinZoom &&
				(map.getBoundsZoom(layers.geojson.getBounds()) - z > 2)
				//TODO remove geojson only by user
			) {
				layers.geojson.clearLayers();
			}

		    if(z < opts.dataMinZoom) {
		    	if(layers.users)
					map.removeLayer(layers.users);
				
				if(layers.cursor)
					map.removeLayer(layers.cursor);
				
				if(layers.cluster)
					map.removeLayer(layers.cluster);

				if(layers.places)
					map.removeLayer(layers.places);

				if(layers.geometries)
					map.removeLayer(layers.geometries);
		    }
		    else {
		    	if(layers.users)
					map.addLayer(layers.users);
				
				if(layers.cursor)
					map.addLayer(layers.cursor);

				if(layers.places)
					map.addLayer(layers.places);

				if(layers.cluster)
					map.addLayer(layers.cluster);

				if(layers.geometries)
					map.addLayer(layers.geometries);

				/* TODO FIX if(opts.tooltips.autoOpen) {
					var bb = map.getBounds().pad(-0.7);
					L.rectangle(bb).addTo(map);
					
					layers.cluster.eachLayer(function(l) {
						
						if(bb.contains(l.getLatLng())){
							l.openTooltip();
						}
					});
				}*/
		    }
		});

		return layers;
	}
});