/*
	map module, layers,controls e panels

	git@github.com:mWater/offline-leaflet-map.git
	
*/
var map = null,
	initialized = false,
	layers = {},
	controls = {};

layers.cluster = new L.MarkerClusterGroup({
	iconCreateFunction: function(cluster) {
		var $icon = L.DomUtil.create('div');
		cluster.checkinsCount = function() {
			return getCheckinsCountByPlaces(_.map(cluster.getAllChildMarkers(), function(marker) {
				return marker.place.id;
			}) );
		};
		Blaze.renderWithData(Template.marker_cluster, cluster, $icon);
		return new L.NodeIcon({
			nodeHtml: $icon,
			className: 'marker-cluster'
		});
	},
	maxClusterRadius: 40,
	spiderfyDistanceMultiplier: 1.4,
	showCoverageOnHover: false
});

layers.geojson = new L.GeoJSONAutoClear(null, {
	style: function (feature) {
		if(feature.properties.tipo=='place')	//punto della place relativa ai pois
			return {color: '#f33', weight: 5, opacity:0.7};
		else if(feature.properties.tipo=='access')	//tracciato avvicinamento
			return {color: '#66f', weight: 8, opacity:0.7};
		else
			return {color: '#b6f', weight: 5, opacity:0.7};
	},
	pointToLayer: function(feature, latlng) {	//costruisce marker POI
		//TODO tracciare linea dritta da place ad ogni POI
		if(feature.properties.tipo==='place')	//evidenzia place nei pois
			return new L.CircleMarker(latlng, {radius:20});
		else
		{
			var iconPoi = L.DomUtil.create('div');
			L.DomUtil.create('i','icon icon-'+feature.properties.tipo, iconPoi);
			return new L.Marker(latlng, {
					icon: new L.NodeIcon({className:'marker-poi', nodeHtml: iconPoi})
				});
		}
	},
	onEachFeature: function (feature, layer) {
		var tmpl, $popup;

		if(feature.geometry.type=='LineString')
			tmpl = Template.popup_track;

		else if(feature.geometry.type=='Point' && feature.properties.name )
			tmpl = Template.popup_poi;

		if(tmpl) {
			$popup = L.DomUtil.create('div');
			Blaze.renderWithData(tmpl, feature.properties, $popup);
			layer.bindPopup($popup, {closeButton:false} );
		}
	}
});

layers.places = new L.LayerJSON({
	layerTarget: layers.cluster,
	minShift: Meteor.settings.public.bboxMinShift,
	caching: false,
	callData: function(bbox, callback) {

		Climbo.map._deps.bbox.changed();

		var sub = Meteor.subscribe('placesByBBox', bbox, function() {
			
			//callback( Places.find().fetch() );
			callback( getPlacesByBBox(bbox).fetch() );
		});

		return {
			abort: sub.stop
		};
	},
	dataToMarker: function(data) {	//eseguito una sola volta per ogni place
		//FIXME! sparisce il contenuto dei popup nei markers in cache
		return Climbo.newPlace(data._id._str).marker;
	}
});
////LAYERS/

controls.zoom = L.control.zoom({
	position: 'bottomright',
	zoomOutText: '',
	zoomInText: ''	
});

controls.attrib = L.control.attribution({
	prefix: i18n('ui.controls.attrib')
});

controls.gps = L.control.gps({
	position: 'topright',
	title: i18n('ui.controls.gps.title'),
	textErr: i18n('ui.controls.gps.error'),
	marker: new L.Marker([0,0], {
		icon: L.divIcon({className: 'marker-gps'})
	}),
	callErr: function(err) {
		Climbo.alert.show(err,'warn');
	}
})
.on({
	gpsdeactivated: function(e) {
		Climbo.profile.setLoc(null);
	},
	gpslocated: function(e) {
		Climbo.profile.setLoc([e.latlng.lat,e.latlng.lng]);
	},
	gpsactivated: function(e) {	//run after gpslocated
		if(Climbo.profile.user && Climbo.profile.user.icon)
			Climbo.profile.user.icon.animate();
		Climbo.alert.show(i18n('ui.alerts.gpson'),'success');		
	}
});

controls.search = L.control.search({
	position: 'topright',
	zoom: Meteor.settings.public.loadLocZoom,	
	autoType: false, tipAutoSubmit: false, delayType: 800,
	minLength: Meteor.settings.public.searchMinLen,	
	autoCollapse: false, autoCollapseTime: 6000,
	animateLocation: true, markerLocation: false,
	propertyLoc: 'loc', propertyName: 'name',
	text: i18n('ui.controls.search.text'),
	textErr: i18n('ui.controls.search.error'),	
	sourceData: function(text, callback) {
		var sub = Meteor.subscribe('placesByName', text, function() {
			var //places = Places.find({name: new RegExp('^'+text,'i') }).fetch(),
				places = getPlacesByName(text).fetch(),
				placesSort = _.sortBy(places,function(item) {
					return item.name + item.reg;
				}),
				placesIds = _.pluck(_.pluck(placesSort, '_id'),'_str');
			
			callback( _.map(placesIds, Climbo.newPlace) );
		});
		return {
			abort: sub.stop
		};
	},
	formatData: function(items) {
		var dataItems = _.map(items, function(item) {
			return _.extend(L.latLng(item.loc), item);
		});
		return _.indexBy(dataItems,'name');
	},
	buildTip: function(key, data) {
		var tip = L.DomUtil.create('div','search-tip');
		Blaze.renderWithData(Template.place_search_tip, data, tip);
		return tip;
	}
})
.on('search_locationfound', function(e) {
	//TODO patch da rimuovere quando L.Control.Search fa la blur da solo
	this._input.blur();
})
.on('search_expanded', function() {
	Router.go('map');
});

Climbo.map = {

	initialized: initialized,

	leafletMap: map,

	controls: controls,

	layers: layers,

	_deps: {
		bbox: new Tracker.Dependency()
	},

	initMap: function(opts, callbackMap) {		//render map and add controls/layers

		if(Climbo.map.initialized) return false;

		Climbo.map.initialized = true;

		opts = _.extend(Meteor.settings.public.map, opts);
		opts = _.extend(opts, {
			attributionControl: false,
			zoomControl: false,	
			maxBounds: L.latLngBounds(opts.maxBounds),
			center: L.latLng(opts.center),
			layer: Meteor.settings.public.layers[opts.layer] || Meteor.settings.public.layerDef
		});

		Climbo.map.leafletMap = new L.Map('map', opts);

		layers.baseLayer = new L.TileLayer( opts.layer );

		_.invoke([
			//controls.attrib,
			controls.zoom,
			//FIX CAUSE BUG WHEN FROM SETTINGS PAGE TO MAP PAGE
			//controls.search,
			controls.gps,
			layers.baseLayer,
			layers.geojson,
			layers.cluster			
		],'addTo', Climbo.map.leafletMap);

		//Fix solo per Safari evento resize! quando passa a schermo intero
		$(window).on('orientationchange resize', function(e) {
			$(window).scrollTop(0);
			Climbo.map.leafletMap.invalidateSize(false);
		});

		if($.isFunction(callbackMap))
			callbackMap(Climbo.map.leafletMap);
	},

	setOpts: function(opts) {
		var m = Climbo.map.leafletMap;

		opts = _.extend(Meteor.settings.public.map, opts);
		opts = _.extend(opts, {
			maxBounds: L.latLngBounds(opts.maxBounds),
			center: L.latLng(opts.center),
			layer: Meteor.settings.public.layers[opts.layer] || Meteor.settings.public.layerDef
		})
		m.setMaxBounds(opts.maxBounds);
		m.setView(opts.center);

		Climbo.map.layers.baseLayer.setUrl( opts.layer );
	},

	destroyMap: function() {
		if(Climbo.map.initialized) {
			Climbo.map.initialized = false;
			Climbo.map.leafletMap.remove();
			Climbo.map.layers.places.clearLayers();
		}
	},
	
	getBBox: function() {
		if(!Climbo.map.initialized) return null;
		
		Climbo.map._deps.bbox.depend();

		var bbox = Climbo.map.leafletMap.getBounds(),
			sw = bbox.getSouthWest(),
			ne = bbox.getNorthEast();
/* TODO		sideW = this.$('#sidebar').width();
			sideBox = 
		//L.rectangle(bbox,{fill:false}).addTo(Climbo.map.leafletMap);

			pbox = map.getPixelBounds(),
			h = pbox.getSize().y-,
			w = pbox.getSize().x-;
*/
		return Climbo.util.geo.roundBbox([[sw.lat, sw.lng], [ne.lat, ne.lng]]);
	},
	enableBBox: function() {
		if(Meteor.settings.public.showPlaces)
			Climbo.map.leafletMap.addLayer(layers.places);
	},
	disableBBox: function() {
		Climbo.map.leafletMap.removeLayer(layers.places);
	},

	loadLoc: function(loc) {
		if(loc && Climbo.util.valid.loc(loc))
			Climbo.map.leafletMap.setView(loc, Meteor.settings.public.loadLocZoom);
	},

	loadGeojson: function(geoData) {

		geoData = L.Util.isArray(geoData) ? geoData : [geoData];

		Climbo.map.leafletMap.closePopup();

		layers.geojson.clearLayers();
		for(var i in geoData)
			layers.geojson.addData(geoData[i]);
	
		var bb = layers.geojson.getBounds();

		Climbo.map.leafletMap.setView(bb.getCenter(), Climbo.map.leafletMap.getBoundsZoom(bb) - 1);
	}
};
