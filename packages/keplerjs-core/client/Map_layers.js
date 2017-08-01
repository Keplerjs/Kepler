
_.extend(Kepler.Map, {

	_initLayers: function() {

		var layers = {};

		layers.baselayer = new L.TileLayer(' ');

		layers.users = new L.LayerGroup();

		layers.cluster = new L.MarkerClusterGroup({
			spiderfyDistanceMultiplier: 1.4,
			showCoverageOnHover: false,
			maxClusterRadius: 40,
			iconCreateFunction: function(clust) {
				if(!clust.$icon)
					clust.$icon = L.DomUtil.create('div');

				clust.checkinsCount = function() {
					var places = _.map(clust.getAllChildMarkers(), function(marker) {
						return marker.item.id;
					});
					return K.findCheckinsCountByPlaces(places);
				};
				
				if(!clust.icon) {
					Blaze.renderWithData(Template.item_place_cluster, clust, clust.$icon);
					clust.icon = new L.NodeIcon({
						className: 'marker-cluster',
						nodeHtml: clust.$icon
					});
				}

				return clust.icon;
			}
		});

		layers.places = new L.LayerJSON({
			caching: false,
			layerTarget: layers.cluster,
			minShift: K.settings.public.map.bboxMinShift,
			callData: function(bbox, callback) {

				var sub = Meteor.subscribe('placesByBBox', bbox, function() {
					callback( K.findPlacesByBBox(bbox).fetch() );
				});

				return {
					abort: sub.stop
				};
			},
			dataToMarker: function(data) {	//eseguito una sola volta per ogni place
				return K.placeById(data._id).marker;
			}
		});

		layers.geojson = new L.GeoJSON(null, {
			//DEBUG autoclear: false,
			style: function (feature) {
				var styles = K.settings.public.map.styles;
				return styles[feature.properties.type || 'default'] || styles.default;
			},
			pointToLayer: function(feature, latlng) {	//costruisce marker POI

				if(feature.properties.type==='placeCircle')	//evidenzia place nei pois
					return new L.CircleMarker(latlng);
				else
				{
					var iconPoi = L.DomUtil.create('div');
					L.DomUtil.create('i', 'icon icon-'+feature.properties.type, iconPoi);
					return new L.Marker(latlng, {
							icon: new L.NodeIcon({className:'marker-poi', nodeHtml: iconPoi})
						});
				}
			},
			onEachFeature: function (feature, layer) {
				var tmpl, $popup;

			//TODO move to pois plugin
			//create template for layer geojson popup that contains 
			//{{> pluginsPlaceholder 'popupGeojson'}}

				if(feature.geometry.type==='LineString')
					tmpl = Template.popupTrack;

				else if(feature.geometry.type==='Point')
					tmpl = Template.popupPoi;

				if(tmpl && feature.properties) {
					$popup = L.DomUtil.create('div','');
					Blaze.renderWithData(tmpl, feature.properties.tags || feature.properties, $popup);
					layer.bindPopup($popup, {closeButton:false} );
				}
			}
		});

		return layers;
	}
});