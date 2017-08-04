/*
	Module for main map

	//TODO include Leaflet.GeometryUtil
*/

Kepler.Map = {

	map: null,
	cursor: null,
	layers: {},
	controls: {},
	items: [],

	_deps: {
		ready: new ReactiveVar(false),
		bbox: new Tracker.Dependency()
	},

	ready: function(val) {
		if(!_.isUndefined(val))
			this._deps.ready.set(val);
		return this._deps.ready.get();
	},
	
	init: function(div, opts, cb) {

		var self = this;

		if(self.ready())
			return this;
		else
			self.ready(true);

		self.map = new L.Map(div, {
			attributionControl: false,
			doubleClickZoom: false,			
			zoomControl: false			
		});

		self.cursor = new L.Cursor({
			popup: {
				closeButton: false,
				minWidth: 120
			}
		});

		self.sidebar$ = $('#sidebar');

		self.layers = self._initLayers(self.map);
		self.controls = self._initControls(self.map);

		self._addComponents();

		self.setOpts(opts);

		//Fix only for Safari event resize! when shift to fullscreen
		$(window).on('orientationchange'+(K.Util.isMobile()?'':' resize'), _.debounce(function(e) {

			$(window).scrollTop(0);
			self.map.invalidateSize(false);

		}, 1000) );

		self.map.whenReady(function() {
			
			self._deps.bbox.changed();

			for(var i in self.items)
				self.addItem(self.items[i]);

			if(_.isFunction(cb))
				cb.call(self);
		})
		.on('moveend zoomend', function(e) {
			self._deps.bbox.changed();
		});

		self.cursor.marker.on('click mousedown', function(e) {
			var div = L.DomUtil.create('div',''),
				cursorData = {
					loc: [e.latlng.lat, e.latlng.lng]
				};
			Blaze.renderWithData(Template.popupCursor, cursorData, div);
			this.bindPopup(div.firstChild, { closeButton:false });
		})

/*		self.cursor.on('popupopen', function(e) {
			var cursorData = {
					loc: [e.latlng.lat, e.latlng.lng]
				};
			this.popup$.innerHTML = '';
			Blaze.renderWithData(Template.popupCursor, cursorData, this.popup$);
		});*/

		return this;
	},

	destroy: function() {

		var l = this.layers,
			c = this.controls;

		if(this.ready()) {
			this.ready(false);

			this.items = [];

			this.map
				.removeLayer(this.cursor)			
				.removeLayer(l.baselayer)
				.removeLayer(l.cluster)
				.removeLayer(l.places)				
				.removeLayer(l.geojson)
				.removeLayer(l.users)				
				.removeControl(c.attrib)
				.removeControl(c.zoom)				
				.removeControl(c.gps);
			
			this.map.remove();	
		}
		return this;
	},

	_addComponents: function() {
		var l = this.layers,
			c = this.controls;		
		this.map
			.addLayer(this.cursor)
			.addLayer(l.baselayer)
			.addLayer(l.cluster)
			.addLayer(l.places)				
			.addLayer(l.geojson)
			.addLayer(l.users)			
			.addControl(c.attrib)
			.addControl(c.zoom)
			.addControl(c.gps);
	},
	
	_setView: function(loc, zoom) {
		if(this.ready()) {
			this.map.setView(loc, zoom);
			/*
			//TODO 
			if(this.sidebar$.hasClass('expanded')) {
				var p = this.map.latLngToContainerPoint(L.latLng(loc));
				p = L.point(p.x - sidebar$.width(), p.y);
				loc = this.map.containerPointToLatLng(p);
			}
			this.map.setView(loc, zoom);
			//*/
		}
		return this;
	},

	isVisible: function() {
		if(!this.ready()) return false;

		var mapw = this.map.getSize().x,
			panelw = (this.sidebar$.hasClass('expanded') && this.sidebar$.width()) || 0;

		return this.ready() && (mapw-panelw > 40);
	},

	setOpts: function(opts) {

		if(this.ready()) {
			opts = _.extend({}, K.settings.public.map, opts);

			if(!K.Util.valid.loc(opts.center))
				opts.center = K.settings.public.map.center;
			
			if(!opts.layers[opts.layer])
				opts.layer = K.settings.public.map.layer;

			this._setView(opts.center, opts.zoom);

			this.layers.baselayer.setUrl( K.settings.public.map.layers[opts.layer] );
		}
		return this;
	},

	getBBox: function() {
		if(this.ready()) {
			this._deps.bbox.depend();

			var bbox = this.map.getBounds(),
				sw = bbox.getSouthWest(),
				ne = bbox.getNorthEast();

			if(this.sidebar$.hasClass('expanded')) {
				var p = this.map.latLngToContainerPoint(sw);
				p.x += this.sidebar$.width();
				sw = this.map.containerPointToLatLng(p);
			}

			return K.Util.geo.roundBbox([[sw.lat, sw.lng], [ne.lat, ne.lng]]);
		}
	},
	
	getCenter: function() {
		if(this.ready())
			return L.latLngBounds(this.getBBox()).getCenter();
	},

	showLoc: function(loc, cb) {
		if(this.ready()) {
			if(_.isFunction(cb))
				this.map.once("moveend zoomend", cb);
			
			if(loc && K.Util.valid.loc(loc))
				this._setView( L.latLng(loc) , K.settings.public.map.showLocZoom);
		}
		return this;
	},

	addItem: function(item) {
		if(this.ready() && item.marker) {
			if(item.type==='place')
				item.marker.addTo( this.layers.places );

			else if(item.type==='user')
				item.marker.addTo( this.layers.users );
		}
		else
			this.items.push(item);
		return this;
	},

	removeItem: function(item) {
		if(this.ready()) {
			if(item && item.marker)
				this.map.removeLayer(item.marker);
		}
		return this;
	},

	addGeojson: function(geoData, opts, cb) {
		if(this.ready()) {

			geoData = _.isArray(geoData) ? geoData : [geoData];

			if(!this.isVisible())
				this.sidebar$.removeClass('expanded');

			this.map.closePopup();

			this.layers.geojson.clearLayers();

			for(var i in geoData) {
				if(geoData[i] && (geoData[i].features || geoData[i].feature))
					this.layers.geojson.addData(geoData[i]);
			}

			if(opts && opts.style)
				this.layers.geojson.setStyle(opts.style);
			
			var bb = this.layers.geojson.getBounds(),
				zoom = this.map.getBoundsZoom(bb),
				loc = bb.getCenter();

			if(_.isFunction(cb))
				this.map.once("moveend zoomend", cb);

			this._setView(loc, zoom);
		}
		return this;
	}
};

