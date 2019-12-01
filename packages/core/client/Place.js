/**
 * Place instances index
 * @global
 * @name K.placesById
 * @type {Object}
 */
Kepler.placesById = {};
/**
 * create new or return current instance of place by Id
 * @global
 * @name placeById
 * @param  {String} id [description]
 * @return {Object}    [description]
 */
Kepler.placeById = function(id) {
	//check(id, String);
	if(!id) return null;
	
	if(id && !K.placesById['id_'+id] && K.findPlaceById(id).fetch()[0])
		K.placesById['id_'+id] = new K.Place(id);

	return K.placesById['id_'+id] || null;
};

/**
 * @class  Model for instantiate places extended from base Class
 * @param  {String} placeId place Mongo ID
 */
Kepler.Place = Class.extend({
	/**
	 * @static
	 * @memberOf Kepler.Place
	 * @type {String}
	 */
	id: null,
	type: 'place',
	template: 'item_place',
	templatePanel: 'panelPlace',	
	templatePopup: 'popupPlace',
	templateTooltip: 'tooltipPlace',
	templateMarker: 'markerPlace',
	classMarker: '',
	data: {},
	/**
	 * force update reactive data instance
	 * @memberOf Kepler.Place
	 * @return {Object}      itself instance
	 */
	update: function() {
	},
	init: function(placeId) {

		var self = this;

		self.id = placeId;

		self._dep = new Tracker.Dependency();

		//TODO replace with Reactive Var!!!

		self.rData = function() {
			self._dep.depend();
			return self;
		};
		//TODO move outside of init()
		self.update = function(comp) {	//sincronizza istanza con dati nel db

			self.data = K.findPlaceById(self.id).fetch()[0];
	
			//TODO rewrite loading data into place instance!
			_.extend(self, self.data);

			if(self.loc) {
				
				self.buildMarker();

				K.Map.addItem(self);

				if(self.marker) {
					//TODO REFACT draw user track
					//build self.polyline... and udate it each time
					if(K.Map.ready()) {
						L.polyline([self.marker.getLatLng(), self.loc], {
							opacity:0.8, weight:3, dashArray: "1,6", color: self.color
						})
						.addTo(K.Map.layers.geojson);
					}
					self.marker.setLatLng(self.loc);
				}
			}

			self._dep.changed();

			return self;
		};
		
		Tracker.autorun(self.update);
	},
	/**
	 * build a Leaflet Marker bind to this instance
	 * @memberOf Kepler.Place
	 * @return {Object} marker instance
	 */
	buildMarker: function() {
		
		var self = this,
			opts = K.settings.public.map;

		//TODO move this in self.update
		if(!opts.layerPlaces.enabled)
			return null;

		if(!self.marker) {
			
			self.icon = new L.NodeIcon({
				/*conSize: new L.Point(opts.icon.iconSize),
				iconAnchor: new L.Point(opts.icon.iconAnchor),
				popupAnchor: new L.Point(opts.icon.popupAnchor),*/				
				nodeHtml: L.DomUtil.create('div')
			});

			self.marker = new L.Marker(self.loc, {icon: self.icon});
			self.marker.item = self;
			self.marker.once('add', function(e) {

				var marker = e.target;

				if(Template[self.templateMarker])
					Blaze.renderWithData(Template[self.templateMarker], self, self.icon.nodeHtml);

				if(opts.popups.enabled) {

					var divp = L.DomUtil.create('div');
				
					if(Template[self.templatePopup])
						Blaze.renderWithData(Template[self.templatePopup], self.rData, divp);
					
					marker.bindPopup(divp.firstChild, opts.popups);
					//TODO disable tooltip if popup is open
					marker.on('popupopen', function(em) {
						setTimeout(function() {
							em.target.closeTooltip();
							K.Map.hideCursor();
						},0);
					});
				}
				else {
					marker.on('click', function(ee) {
						Router.go('panelPlace',{placeId: self.id});
					});
				}

				marker.on('dblclick', function(ee) {
					Router.go('panelPlace',{placeId: self.id});
				});
				
				if(opts.tooltips.enabled) {

					var divt = L.DomUtil.create('div');

					if(Template[self.templateTooltip])
						Blaze.renderWithData(Template[self.templateTooltip], self.rData, divt);
				
					marker.bindTooltip(divt.firstChild, K.Map.options.tooltip);
					/*	TODO marker.on('opentooltip', function(e) {

					});*/
				}
			});
		}
		return self.marker;
	},
	/**
	 * build a Leaflet GeoJSON layer bind to this geometry instance
	 * @memberOf Kepler.Place
	 * @return {Object} geometry instance
	 */
	buildGeometry: function() {
		var self = this,
			opts = K.settings.public.map;

		//TODO move this in self.update
		if(!opts.layerPlaces.enabled)
			return null;

		if(!self.geom && self.geometry && 
			self.geometry.type!=='Point' && 
			self.geometry.coordinates) {
			
			self.geom = new L.GeoJSON(self.geometry, {
				style: function (f) {
					return f.style || opts.styles.geometry;
				}
			});
			self.geom.item = self;
			self.geom.on('mouseover mouseout', function(e) {
				L.DomEvent.stopPropagation(e);
				e.target.item.marker.fire(e.type);
			});
		}

		return self.geom;
	},
	/**
	 * load on map the place location
	 * @memberOf Kepler.Place
	 */
	showLoc: function(cb) {		//TODO rename showLoc in showLoc
		
		cb = _.isFunction(cb) ? cb : $.noop;

		var self = this;
		
		self.buildMarker();

		K.Map.showLoc(self.loc, function(loc) {
			Meteor.setTimeout(function() {
				self.marker.openPopup();
				self.icon.animate();
				cb(loc);
			},200);
		});
	},
	/**
	 * load on map the place geometry
	 * @memberOf Kepler.Place
	 */
	showGeometry: function(cb) {

		cb = _.isFunction(cb) ? cb : $.noop;

		var self = this;
		//self.update();
		
		self.buildGeometry();

		if(K.Map.ready()) {
			if(self.geom && self.geometry.type!=='Point') {
				self.geom.addTo(K.Map.layers.geometries);
				K.Map.fitBounds(self.geom.getBounds(), function(loc) {
					self.marker.openPopup();
					cb(loc);
				});
			}
			else
				self.showLoc(function(loc) {
					self.marker.openPopup();
					cb(loc);
				});
		}
	},
	
	isOutdoor: function() {
		return !this.indoor;
	},
	/**
	 * return true if I am in this place
	 * @memberOf Kepler.Place
	 * @return {Boolean} 
	 */
	isCheckin: function() {
		return K.Profile.data.checkin && (K.Profile.data.checkin === this.id);
	},
	/**
	 * return number of users in this place
	 * @memberOf Kepler.Place
	 * @return {Number}
	 */
	checkinsCount: function() {
		this._dep.depend();
		return this.checkins && this.checkins.length;
	}
});
