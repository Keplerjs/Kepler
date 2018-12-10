/**
 * place instances index
 * @type {Object}
 */
Kepler.placesById = {};

/**
 * create new Place instance or return it if exists
 * @param  {String} id Mongo Id
 * @return {Place}   K.Place instance
 */	
Kepler.placeById = function(id) {
	check(id, String);
	
	if(id && !K.placesById['id_'+id] && K.findPlaceById(id).fetch()[0])
		K.placesById['id_'+id] = new K.Place(id);
	
	return K.placesById['id_'+id] || null;
};

/**
 * Model for instantiate places
 * @param  {[type]} placeId) {		var       self [description]
 * @return {[type]}          [description]
 */
Kepler.Place = Class.extend({

	id: null,
	type: 'place',
	template: 'item_place',
	templatePanel: 'panelPlace',	
	templatePopup: 'popupPlace',
	templateTooltip: 'tooltipPlace',
	templateMarker: 'markerPlace',
	classMarker: '',
	data: {},
	
	init: function(placeId) {

		var self = this;

		self.id = placeId;

		self._dep = new Tracker.Dependency();

	//TODO replace with Reactive Var!!!

		self.rData = function() {
			self._dep.depend();
			return self;
		};

		self.update = function(comp) {	//sincronizza istanza con dati nel db

			self.data = K.findPlaceById(self.id).fetch()[0];
		
			//TODO rewrite loading data into place instance!
			_.extend(self, self.data);

			if(self.loc) {
				
				self.buildMarker();

				K.Map.addItem(self);
			}

			self._dep.changed();

			return self;
		};
		
		Tracker.autorun(self.update);
	},

	buildMarker: function() {
		
		var self = this;

		if(!self.marker) {
			var opts = K.settings.public.map;
			
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
					/* TODO disable tooltip if popup is open
					 marker.on('popupopen', function(ee) {
						var t = e.target.getTooltip();
						ee.target.unbindTooltip()
						console.log(t)
					});*/
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

	showLoc: function() {		//TODO rename showLoc in showLoc
		var self = this;
		
		self.buildMarker();

		K.Map.showLoc(self.loc, function() {
			Meteor.setTimeout(function() {
				self.marker.openPopup();
				self.icon.animate();
			},200);
		});
	},

	loadPanel: function() {
		Router.go('panelPlace', {placeId: this.id });
	},
	
	isOutdoor: function() {
		return !this.indoor;
	},

	isCheckin: function() {
		return K.Profile.data.checkin && (K.Profile.data.checkin === this.id);
	},

	checkinsCount: function() {
		this._dep.depend();
		return this.checkins && this.checkins.length;
	}
});
