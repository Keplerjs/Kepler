
var layers = {},
	controls = {},
	styles = {
		def: {		//default geojson style
			color: '#b6f', weight: 5, opacity:0.7
		},
		access: {	//tracks
			color: '#66f', weight: 8, opacity: 0.7
		},
		placeCircle: {	//circle around place
			color: '#f33', weight: 4, opacity: 0.7, radius: 15,
		},	
		poiLine: {	//line from place to pois
			color: '#f33', weight: 4, opacity: 0.7, dashArray: '1,6'
		}
	};

layers.baselayer = new L.TileLayer(' ');

layers.users = new L.LayerGroup();

layers.cluster = new L.MarkerClusterGroup({
	spiderfyDistanceMultiplier: 1.4,
	showCoverageOnHover: false,
	maxClusterRadius: 40,
	iconCreateFunction: function(cluster) {
		var $icon = L.DomUtil.create('div');
		cluster.checkinsCount = function() {
			var places = _.map(cluster.getAllChildMarkers(), function(marker) {
				return marker.item.id;
			});
			return getCheckinsCountByPlaces(places);
		};
		Blaze.renderWithData(Template.marker_cluster, cluster, $icon);
		return new L.NodeIcon({
			nodeHtml: $icon,
			className: 'marker-cluster'
		});
	}	
});

layers.geojson = new L.GeoJSONAutoClear(null, {
	style: function (feature) {
		return styles[feature.properties.tipo || 'def'] || styles.def;
	},
	pointToLayer: function(feature, latlng) {	//costruisce marker POI
		
		if(feature.properties.tipo==='placeCircle')	//evidenzia place nei pois
			return new L.CircleMarker(latlng);
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

		console.log(feature.properties)

		if(feature.geometry.type==='LineString')
			tmpl = Template.popup_track;

		else if(feature.geometry.type==='Point')
			tmpl = Template.popup_poi;

		if(tmpl && feature.properties.name) {
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
			
			callback( getPlacesByBBox(bbox).fetch() );
		});

		return {
			abort: sub.stop
		};
	},
	dataToMarker: function(data) {	//eseguito una sola volta per ogni place
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
	gpsdisabled: function(e) {
		Climbo.profile.setLoc(null);
	},
	gpslocated: function(e) {
		Climbo.profile.setLoc([e.latlng.lat, e.latlng.lng]);
		if(Climbo.profile.user && Climbo.profile.user.icon)
			Climbo.profile.user.icon.animate();
		//Climbo.alert.show(i18n('ui.alerts.gpson'),'success');		
	}
});

controls.search = L.control.search({
	position: 'topright',
	autoType: false, tipAutoSubmit: false, delayType: 800,
	minLength: Meteor.settings.public.searchMinLen,	
	animateLocation: true, markerLocation: false,
	autoCollapse: false, autoCollapseTime: 6000,	
	propertyLoc: 'loc', propertyName: 'name',
	text: i18n('ui.controls.search.text'),
	textErr: i18n('ui.controls.search.error'),	
	sourceData: function(text, callback) {

		var sub = Meteor.subscribe('placesByName', text, function() {
			var places = getPlacesByName(text).fetch(),
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
	this._input.blur();
})
.on('search_expanded', function() {
	Router.go('map');
});



Climbo.map = {

	ready: false,

	leafletMap: null,

	_deps: {
		bbox: new Tracker.Dependency()
	},

	initMap: function(opts, cb) {		//render map and add controls/layers

		var self = this;

		if(self.ready) return this;

		self.ready = true;

		self.leafletMap = new L.Map('map', _.extend(opts, {
			zoomControl: false,			
			attributionControl: false
		}) );
		
		self.setOpts(opts);

		_.invoke([
			layers.baselayer,
			controls.search,
			controls.zoom,			
			controls.gps,
			layers.geojson,
			layers.cluster,
			layers.users,
			controls.attrib
		],'addTo', self.leafletMap);

		//Fix solo per Safari evento resize! quando passa a schermo intero
		$(window).on('orientationchange resize', function(e) {

		//TODO debounce

			$(window).scrollTop(0);
			self.leafletMap.invalidateSize(false);
		});

		if($.isFunction(cb))
			self.leafletMap.whenReady(cb, self);

		return this;
	},

	setOpts: function(opts) {
		var self = this;

		if(!self.ready) return this;
		
		opts = _.defaults(opts, Meteor.settings.public.map);

		self.leafletMap.setView(opts.center, opts.zoom);

		layers.baselayer.setUrl( Meteor.settings.public.layers[opts.layer] );
		return this;
	},

	destroyMap: function() {
		if(this.ready) {
			this.ready = false;
			this.leafletMap.remove();
			layers.places.clearLayers();
		}
		return this;
	},
	
	enableBBox: function() {
		if(!this.ready) return this;

		if(Meteor.settings.public.showPlaces)
			this.leafletMap.addLayer(layers.places);
		return this;
	},
	disableBBox: function() {
		this.leafletMap.removeLayer(layers.places);
		return this;
	},

	getBBox: function() {
		if(this.ready) {
			this._deps.bbox.depend();

			var bbox = this.leafletMap.getBounds(),
				sw = bbox.getSouthWest(),
				ne = bbox.getNorthEast();
			//TODO LOOK	at leaflet-geojson-selector fox reduce bbox with openened panel

			return Climbo.util.geo.roundBbox([[sw.lat, sw.lng], [ne.lat, ne.lng]]);
		}
	},
	
	loadLoc: function(loc, cb) {

		if(!this.ready) return this;

		if(_.isFunction(cb))
			this.leafletMap.once("moveend zoomend", cb);
		
		if(loc && Climbo.util.valid.loc(loc))
			this.leafletMap.setView(loc, Meteor.settings.public.loadLocZoom);

		return this;
	},

	loadItem: function(item) {

		if(!this.ready) return this;
		
		if(item.type==='place')
			item.marker.addTo( layers.places );

		else if(item.type==='user')
			item.marker.addTo( layers.users );

		return this;
	},

	loadGeojson: function(geoData, cb) {

		if(!this.ready) return this;

		geoData = L.Util.isArray(geoData) ? geoData : [geoData];

		this.leafletMap.closePopup();

		layers.geojson.clearLayers();
		for(var i in geoData) {
			layers.geojson.addData(geoData[i]);
		}
	
		var bb = layers.geojson.getBounds(),
			zoom = this.leafletMap.getBoundsZoom(bb),
			loc = bb.getCenter();

		if(_.isFunction(cb))
			this.leafletMap.once("moveend zoomend", cb);
		
		this.leafletMap.setView(loc, zoom-1);

		return this;
	}
};
