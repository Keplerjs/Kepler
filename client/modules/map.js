/*
	modulo gestione map, layers,controls e pannels
*/
var map = null,
	initialized = false,
	layers = {},
	controls = {},
	buttons = {},
	panels = {};

function panelAutoClose() {	//larghezza minima per auto chiusura panels
	return $(window).width() < 600;
	//TODO misurare larghezza panels con metodo .getOffset()
}

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
		
		UI.insert(UI.renderWithData(Template.marker_cluster, cluster), icon$);
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
			UI.insert(UI.renderWithData(tmpl, feature.properties), popup$);
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

controls.zoom = L.control.zoom();

controls.attrib = L.control.attribution({prefix: Climbo.i18n.ui.controls.attrib, position:'topright' });

controls.gps = L.control.gps({
	title: Climbo.i18n.ui.controls.gps.title,
	textErr: Climbo.i18n.ui.controls.gps.error,
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
	//console.log('gpslocated',e.latlng.toString());
	Climbo.profile.setLoc([e.latlng.lat,e.latlng.lng]);
})
.on('gpsactivated', function(e) {	//run after gpslocated
	//console.log('gpsactivated',e);
	Climbo.alerts.show(Climbo.i18n.ui.alerts.gpson,'success');
	Climbo.profile.user.icon.animate();
});

controls.search = L.control.search({
	zoom: 15,
	minLength: Meteor.settings.public.searchMinLen,		
	text: Climbo.i18n.ui.controls.search.text,
	textErr: Climbo.i18n.ui.controls.search.error,
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
		UI.insert(UI.renderWithData(Template.place_search_tip, data), tip);
		return tip;
	}
})
.on('search_locationfound', function() {
	//TODO patch da rimuovere quando L.Control.Search fa la blur da solo
	this._input.blur();
});

controls.alerts = _.extend(L.control({position:'topright'}), {
	onAdd: function(map) {
		var tmpDiv = L.DomUtil.create('div','leaflet-control leaflet-control-alerts');
		UI.insert(UI.render(Template.control_alerts), tmpDiv);
		return tmpDiv;
	}
});
////CONTROLS/

buttons.status = _.extend(L.control({position:'topleft'}), {
	onAdd: function(map) {
		var tmpDiv = L.DomUtil.create('div','leaflet-control leaflet-control-status');
		UI.insert(UI.render(Template.control_status), tmpDiv);
		return tmpDiv;
	}
});

buttons.profile = _.extend(L.control({position:'bottomleft'}), {
	onAdd: function(map) {
		var tmpDiv = L.DomUtil.create('div','leaflet-control leaflet-control-profile');
		UI.insert(UI.render(Template.control_profile), tmpDiv);
		return tmpDiv;
	}
});

buttons.friends = _.extend(L.control({position:'bottomright'}), {
	onAdd: function(map) {
		var tmpDiv = L.DomUtil.create('div','leaflet-control leaflet-control-friends');
		UI.insert(UI.render(Template.control_friends), tmpDiv);
		return tmpDiv;
	}
});
//BUTTONS/

Climbo.map = {

	initialized: initialized,

	leafletMap: map,

	panels: panels,

	controls: controls,

	layers: layers,

	initMap: function(opts, callbackMap) {		//render map and add controls/layers

		//console.log('Climbo.map.initMap');

		Climbo.map.initialized = true;
		
		Climbo.map.leafletMap = map = L.map('map', {
				center: new L.latLng(opts.center),
				zoom: opts.zoom,
				minZoom: opts.zoom,
				maxZoom: 19,
				maxBounds: L.latLngBounds(L.latLng(opts.maxbbox[0]),L.latLng(opts.maxbbox[1])),
				zoomControl: false,
				attributionControl: false
			});

		panels.profile = L.control.sidebar('profile', {position: 'left',  autoPan:false});
		panels.friends = L.control.sidebar('friends', {position: 'right', autoPan:false});
		panels.place = L.control.sidebar('place', {position: 'right', autoPan:false});			
		panels.user = L.control.sidebar('user', {position: 'right', autoPan:false});
		//initilized after DOM ready

console.log('initMap',map);

		_.invoke([
			panels.profile, panels.friends, panels.place, panels.user,
			controls.search, controls.gps, controls.zoom, controls.attrib, controls.alerts,
			buttons.status, buttons.profile, buttons.friends,
			layers.base, layers.geojson, layers.cluster
		],'addTo', map);


		//TODO if(Meteor.Device.isPhone())
			// map
			// .on('click', function(e) {
			// 	panels.place.hide();
			// 	panels.friends.hide();
			// 	panels.user.hide();
			// })
			// .on('popupopen', function(e) {
			// 	var px = map.project(e.popup._latlng);
			// 	px.y -= e.popup._container.clientHeight/2
			// 	map.panTo(map.unproject(px),{animate: true});
			// });

		//Fix solo per Safari evento resize! quando passa a schermo intero
		$(window).on('orientationchange resize', function(e) {
			$(window).scrollTop(0);
			map.invalidateSize(false);
		});

		if($.isFunction(callbackMap))
			callbackMap(map);

		return map;
	},

	enableBBox: function() {
		map.addLayer(layers.places);
	},
	disableBBox: function() {
		map.removeLayer(layers.places);
	},

	loadPanelProfile: function() {
		if(panelAutoClose())
		{
			panels.place.hide();
			panels.friends.hide();
			panels.user.hide();
		}
		panels.profile.toggle();
	},
	loadPanelPlace: function(placeId) {
		
		panels.place.hide();

		Session.set('panelPlaceId', placeId );
		//TODO spostare in Climbo.Place.loadPanel()
		
		Climbo.dialogList.hide();
		Climbo.convers.hide();
		
		if(panelAutoClose())
			panels.profile.hide();
		
		panels.friends.hide();
		panels.user.hide();
		panels.place.show();
	},
	loadPanelFriends: function() {
		if(panelAutoClose())
			panels.profile.hide();
		
		panels.place.hide();
		panels.user.hide();
		panels.friends.toggle();
	},
	loadPanelUser: function(userId) {

		panels.user.hide();

		Session.set('panelUserId', userId );
		//TODO spostare in Climbo.User.loadPanel()

		Climbo.dialogList.hide();
		Climbo.convers.hide();

		if(panelAutoClose())
			panels.profile.hide();
		
		panels.place.hide();
		panels.friends.hide();
		panels.user.show();
	},

	loadLoc: function(loc) {

		Climbo.dialogList.hide();
		Climbo.convers.hide();

		if(panelAutoClose())
			_.invoke(panels,'hide');
		
		map.setView(loc, 15);
	},

	loadGeojson: function(geoData) {

		geoData = L.Util.isArray(geoData) ? geoData : [geoData];

		if(panelAutoClose())
			Climbo.map.panels.place.hide();

		map.closePopup();

		layers.geojson.clearLayers();
		for(var i in geoData)
			layers.geojson.addData(geoData[i]);
	
		var bb = layers.geojson.getBounds();
		map.setView(bb.getCenter(), map.getBoundsZoom(bb) - 1);
	}
};
