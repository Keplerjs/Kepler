/*
	Model for instantiate places
*/
Kepler.Place = Class.extend({

	id: null,
	type: 'place',
	template: 'item_place',
	templatePanel: 'panelPlace',	
	templatePopup: 'popupPlace',
	templateMarker: 'markerPlace',
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
			
			_.extend(self, self.data);

			if(self.loc) {
				
				self.buildMarker();

				K.Map.addItem(self);
			}

			self._dep.changed();

			return self;
		};
		Tracker.autorun( self.update );
	},

	buildMarker: function() {
		
		var self = this;

		if(!self.marker) {
			var iconOpts = K.settings.public.map.icon;
			self.icon = new L.NodeIcon({
				/*iconSize: new L.Point(iconOpts.iconSize),
				iconAnchor: new L.Point(iconOpts.iconAnchor),
				popupAnchor: new L.Point(iconOpts.popupAnchor),*/
				nodeHtml: L.DomUtil.create('div'),
				className: self.name ? 'marker-place' : 'marker-gray',
			});
			self.marker = new L.Marker(self.loc, {icon: self.icon});
			self.marker.item = self;
			self.marker.on('click', function(e) {
					if(!this._popup) {
						var div = L.DomUtil.create('div','');
						if(Template[self.templatePopup])
							Blaze.renderWithData(Template[self.templatePopup], self, div);
						this.bindPopup(div.firstChild, K.settings.public.map.popup);
					}
				}).once('add', function(e) {
					if(Template[self.templateMarker])
						Blaze.renderWithData(Template[self.templateMarker], self, self.icon.nodeHtml);
				});
		}
		return self.marker;
	},

	showLoc: function() {		//TODO rename showLoc in showLoc
		var self = this;
		
		self.buildMarker();

		K.Map.showLoc(self.loc, function() {
			//TODO FIXME self.marker.fire('click');
			self.icon.animate();
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

Kepler.extend({
	placesById: {},
	placeById: function(id) {
		check(id, String);
		
		if(!K.placesById['id_'+id] && K.findPlaceById(id).fetch()[0])
			K.placesById['id_'+id] = new K.Place(id);
		
		return K.placesById['id_'+id] || null;
	}
});