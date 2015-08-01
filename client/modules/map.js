/*
	modulo gestione map, layers,controls e pannels
*/
var map = null,
	initialized = false,
	layers = {},
	controls = {},
	buttons = {};

L.GeoJSONAutoClear = L.GeoJSON.extend({
	onAdd: function(map) {
			L.GeoJSON.prototype.onAdd.call(this, map);
			var that = this;
			map.on('zoomend', function(e) {
				if( _.size(that._layers) )
					if(e.target.getZoom() < e.target.getBoundsZoom(that.getBounds())-2)
						that.clearLayers();
				console.info('zoom:'+e.target.getZoom());
			});
		}
	});//layer geojson autopulente quando si fa zoom out

layers.base = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

layers.cluster = new L.MarkerClusterGroup({
	iconCreateFunction: function(cluster) {
		var icon$ = L.DomUtil.create('div');

		cluster.checkinsCount = function() {
			var placeIds = _.map(cluster.getAllChildMarkers(), function(marker) {
					return marker.place.id;
				});
			return getCheckinsCountByPlaces(placeIds);
		};
		
		Blaze.renderWithData(Template.marker_cluster, cluster, icon$);
		return new L.NodeIcon({className:'marker-cluster', nodeHtml: icon$ });
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
		var tmpl, popup$;

		if(feature.geometry.type=='LineString')
			tmpl = Template['popup_track'];

		else if(feature.geometry.type=='Point' && feature.properties.name )
			tmpl = Template['popup_poi'];
		
		if(tmpl) {
			popup$ = document.createElement('div');
			Blaze.renderWithData(tmpl, feature.properties, popup$);
			layer.bindPopup(popup$, {closeButton:false} );
		}
	}
});

layers.places = new L.LayerJSON({
	layerTarget: layers.cluster,
	minShift: Meteor.settings.public.bboxMinShift,
	callData: function(bbox, callback) {

		var sub = Meteor.subscribe('placesByBBox', bbox, function() {
			callback( Places.find().fetch() );
			//FIXME usare $within
			//Climbo.alerts.observePlaces([Climbo.profile.data.checkin]);
		});

		return {
			abort: function() {
				sub.stop();
			}
		};
	},
	dataToMarker: function(data) {	//eseguito una sola volta per ogni place
		//FIXME! sparisce il contenuto dei popup nei markers in cache
		return Climbo.newPlace(data._id._str).marker;
	}
});
////LAYERS/

controls.zoom = L.control.zoom({
	position: 'topright',
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
		Climbo.alerts.show(err,'warn');
	}
})
.on('gpsdeactivated', function(e) {
	Climbo.profile.setLoc(null);
})
.on('gpslocated', function(e) {
	Climbo.profile.setLoc([e.latlng.lat,e.latlng.lng]);
})
.on('gpsactivated', function(e) {	//run after gpslocated
	Climbo.alerts.show(i18n('ui.alerts.gpson'),'success');
	Climbo.profile.user.icon.animate();
});

controls.search = L.control.search({
	zoom: 15,
	position: 'topright',
	minLength: Meteor.settings.public.searchMinLen,		
	text: i18n('ui.controls.search.text'),
	textErr: i18n('ui.controls.search.error'),
	autoType: false, tipAutoSubmit: true, delayType: 800,	
	autoCollapse: false, autoCollapseTime: 6000,
	animateLocation: true, markerLocation: false,
	propertyLoc: 'loc',
	propertyName: 'name',			
	callData: function(text, callback) {
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
	filterJSON: function(items) {
		var dataItems = _.map(items, function(item) {
			return _.extend(L.latLng(item.loc), item);
		});
		return _.indexBy(dataItems,'name');
	},
	callTip: function(key, data) {
		var tip = L.DomUtil.create('div','search-tip');
		Blaze.renderWithData(Template.place_search_tip, data, tip);
		return tip;
	}
})
.on('search_locationfound', function() {
	//TODO patch da rimuovere quando L.Control.Search fa la blur da solo
	this._input.blur();
});

controls.alerts = _.extend(L.control({position:'topleft'}), {
	onAdd: function(map) {
		var tmpDiv = L.DomUtil.create('div','leaflet-control leaflet-control-alerts');
		Blaze.render(Template.control_alerts, tmpDiv);
		return tmpDiv;
	}
});
////CONTROLS/

buttons.status = _.extend(L.control({position:'topright'}), {
	onAdd: function(map) {
		var tmpDiv = L.DomUtil.create('div','leaflet-control leaflet-control-status');
		Blaze.render(Template.control_status, tmpDiv);
		return tmpDiv;
	}
});
//BUTTONS/

Climbo.map = {

	initialized: initialized,

	leafletMap: map,

	controls: controls,

	layers: layers,

	initMap: function(opts, callbackMap) {		//render map and add controls/layers
		
		console.log('initMap');

		Climbo.map.initialized = true;

		Climbo.map.leafletMap = L.map('map', L.Util.extend(opts, {
			maxBounds: L.latLngBounds(opts.maxBounds),
			center: L.latLng(opts.center),
			attributionControl: false,
			zoomControl: false
		}) );

		_.invoke([
			layers.base, layers.geojson, layers.cluster,			
			controls.search, controls.gps, controls.zoom, buttons.status,
			controls.alerts, controls.attrib
			//buttons.status, buttons.profile, buttons.friends,
		],'addTo', Climbo.map.leafletMap);

		//Fix solo per Safari evento resize! quando passa a schermo intero
		$(window).on('orientationchange resize', function(e) {
			$(window).scrollTop(0);
			Climbo.map.leafletMap.invalidateSize(false);
		});

		if($.isFunction(callbackMap))
			//Climbo.map.leafletMap.on('load', function() {
				callbackMap(Climbo.map.leafletMap);
			//});
	},

	enableBBox: function() {
		Climbo.map.leafletMap.addLayer(layers.places);
	},
	disableBBox: function() {
		Climbo.map.leafletMap.removeLayer(layers.places);
	},

	destroyMap: function() {
		//TODO other desotry methods
		Climbo.map.leafletMap.remove();
	},

	loadPanelProfile: function() {
		//TODO go to route
		console.log('loadPanelProfile')
	},
	loadPanelPlace: function(placeId) {
		
		console.log('loadPanelPlace')

		Session.set('panelPlaceId', placeId );
	},
	loadPanelFriends: function() {
		
		console.log('loadPanelFriends');
	},
	loadPanelUser: function(userId) {

		console.log('loadPanelUser');

		Session.set('panelUserId', userId );
	},

	loadLoc: function(loc) {

		//HIDE ALL PANELS
		
		map.setView(loc, 15);
	},

	loadGeojson: function(geoData) {

		geoData = L.Util.isArray(geoData) ? geoData : [geoData];

		//TODO close panel place

		map.closePopup();

		layers.geojson.clearLayers();
		for(var i in geoData)
			layers.geojson.addData(geoData[i]);
	
		var bb = layers.geojson.getBounds();
		map.setView(bb.getCenter(), map.getBoundsZoom(bb) - 1);
	}
};
