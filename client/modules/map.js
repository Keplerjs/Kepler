
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
		if(!cluster.$icon)
			cluster.$icon = L.DomUtil.create('div');

		cluster.checkinsCount = function() {
			var places = _.map(cluster.getAllChildMarkers(), function(marker) {
				return marker.item.id;
			});
			return getCheckinsCountByPlaces(places);
		};
		
		if(!cluster.icon) {
			Blaze.renderWithData(Template.marker_cluster, cluster, cluster.$icon);
			cluster.icon = new L.NodeIcon({
				className: 'marker-cluster',
				nodeHtml: cluster.$icon
			});
		}

		return cluster.icon;
	}
});

layers.places = new L.LayerJSON({
	layerTarget: layers.cluster,
	minShift: Meteor.settings.public.bboxMinShift,
	caching: false,
	callData: function(bbox, callback) {

		K.map._deps.bbox.changed();

		var sub = Meteor.subscribe('placesByBBox', bbox, function() {
			
			callback( getPlacesByBBox(bbox).fetch() );
		});

		return {
			abort: sub.stop
		};
	},
	dataToMarker: function(data) {	//eseguito una sola volta per ogni place
		return K.newPlace(data._id._str).marker;
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

		if(feature.geometry.type==='LineString')
			tmpl = Template.popup_track;

		else if(feature.geometry.type==='Point')
			tmpl = Template.popup_poi;

		if(tmpl && feature.properties.name) {
			$popup = L.DomUtil.create('div','popup-track');
			Blaze.renderWithData(tmpl, feature.properties, $popup);
			layer.bindPopup($popup, {closeButton:false} );
		}
	}
});
////LAYERS/

controls.zoom = L.control.zoom({
	position: 'bottomright',
	zoomOutText: '',
	zoomInText: ''	
});

controls.attrib = L.control.attribution({
	position: 'bottomright',
	prefix: i18n('website.copy')+' &bull; '+i18n('controls.attrib')
});

controls.gps = L.control.gps({
	position: 'topright',
	title: i18n('controls.gps.title'),
	textErr: null,//i18n('controls.gps.error'),
	marker: new L.Marker([0,0], {
		icon: L.divIcon({className: 'marker-gps'})
	}),
	callErr: function(err) {
		K.notif.show(err,'warn');
	}
})
.on({
	gpsdisabled: function(e) {
		K.profile.setLoc(null);
	},
	gpslocated: function(e) {
		K.profile.setLoc([e.latlng.lat, e.latlng.lng]);
		if(K.profile.user && K.profile.user.icon)
			K.profile.user.icon.animate();
		K.notif.show(i18n('notifs.gpson'),'success');		
	}
});

controls.search = L.control.search({
	position: 'topright',
	autoType: false, tipAutoSubmit: false, delayType: 800,
	minLength: Meteor.settings.public.searchMinLen,	
	animateLocation: true, markerLocation: false,
	autoCollapse: false, autoCollapseTime: 6000,	
	propertyLoc: 'loc', propertyName: 'name',
	text: i18n('controls.search.text'),
	textErr: i18n('controls.search.error'),	
	sourceData: function(text, callback) {

		var sub = Meteor.subscribe('placesByName', text, function() {
			var places = getPlacesByName(text).fetch(),
				placesSort = _.sortBy(places,function(item) {
					return item.name + item.reg;
				}),
				placesIds = _.pluck(_.pluck(placesSort, '_id'),'_str');
			
			callback( _.map(placesIds, K.newPlace) );
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
.on({
	search_locationfound: function(e) {
		this._input.blur();
	},
	search_expanded: function() {
		K.router.go('map');
	}
});



Kepler.map = {

	ready: false,

	_map: null,

	_deps: {
		bbox: new Tracker.Dependency()
	},

	initMap: function(opts, cb) {		//render map and add controls/layers

		var self = this;

		if(self.ready) return this;

		self.ready = true;

		self._map = new L.Map('map', {		
			attributionControl: false,
			zoomControl: false			
		});

		self._addControls();

		self.setOpts(opts);

		//Fix only for Safari event resize! when shift to fullscreen
		$(window).on('orientationchange'+(K.util.isMobile()?'':' resize'), _.debounce(function(e) {

			$(window).scrollTop(0);
			//console.log('invalidateSize', (new Date).getTime(), self._map.getSize() )
			self._map.invalidateSize(false);

		}, Meteor.settings.public.typeDelay+1000) );

		if($.isFunction(cb))
			self._map.whenReady(cb, self);

		return this;
	},

	_addControls: function() {
		_.invoke([
			layers.baselayer,
			controls.attrib,			
			controls.search,
			controls.zoom,			
			controls.gps,
			layers.geojson,
			layers.users
		],'addTo', this._map);
	},
	
	_setView: function(loc, zoom) {
		if(this.ready) {
			this._map.setView(loc, zoom);
			/*TODO var $sidebar = $('#sidebar');
			if($sidebar.hasClass('expanded')) {
				var p = this._map.latLngToContainerPoint(L.latLng(loc));
				p = L.point(p.x - $sidebar.width(), p.y);
				loc = this._map.containerPointToLatLng(p);
			}
			this._map.setView(loc, zoom);
			//*/
		}
		return this;
	},

	setOpts: function(opts) {
		if(this.ready) {
			opts = _.extend({}, Meteor.settings.public.map, opts);

			if(!K.util.valid.loc(opts.center))
				opts.center = Meteor.settings.public.map.center;
			
			if(!Meteor.settings.public.layers[opts.layer])
				opts.layer = Meteor.settings.public.map.layer;

			this._setView(opts.center, opts.zoom);

			layers.baselayer.setUrl( Meteor.settings.public.layers[opts.layer] );
		}
		return this;
	},

	destroyMap: function() {
		if(this.ready) {
			this.ready = false;
			layers.places.clearLayers();			
			layers.cluster.clearLayers();
			this._map.remove();			
		}
		return this;
	},
	
	enableBBox: function() {
		if(this.ready) {
			this._map.addLayer(layers.cluster);
			this._map.addLayer(layers.places);
		}
		return this;
	},
	disableBBox: function() {
		if(this.ready) {
			this._map.removeLayer(layers.places);
			this._map.removeLayer(layers.cluster);
		}
		return this;
	},

	getBBox: function() {
		if(this.ready) {
			this._deps.bbox.depend();

			var bbox = this._map.getBounds(),
				sw = bbox.getSouthWest(),
				ne = bbox.getNorthEast();

			var $sidebar = $('#sidebar');
			if($sidebar.hasClass('expanded')) {
				var p = this._map.latLngToContainerPoint(sw);
				p.x += $sidebar.width();
				sw = this._map.containerPointToLatLng(p);
			}

			return K.util.geo.roundBbox([[sw.lat, sw.lng], [ne.lat, ne.lng]]);
		}
	},
	
	loadLoc: function(loc, cb) {
		if(this.ready) {
			if(_.isFunction(cb))
				this._map.once("moveend zoomend", cb);
			
			if(loc && K.util.valid.loc(loc))
				this._setView(loc, Meteor.settings.public.loadLocZoom);
		}
		return this;
	},

	addItem: function(item) {
		if(this.ready) {
			if(item.type==='place')
				item.marker.addTo( layers.places );

			else if(item.type==='user')
				item.marker.addTo( layers.users );
		}
		return this;
	},

	removeItem: function(item) {
		if(this.ready) {
			if(item && item.marker)
				this._map.removeLayer(item.marker);
		}
		return this;
	},

	loadGeojson: function(geoData, cb) {
		if(this.ready) {
			geoData = _.isArray(geoData) ? geoData : [geoData];

			this._map.closePopup();

			layers.geojson.clearLayers();
			for(var i in geoData)
				layers.geojson.addData(geoData[i]);
		
			var bb = layers.geojson.getBounds(),
				zoom = this._map.getBoundsZoom(bb),
				loc = bb.getCenter();

			if(_.isFunction(cb))
				this._map.once("moveend zoomend", cb);
			
			this._setView(loc, zoom);
		}
		return this;
	}
};
