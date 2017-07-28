
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
			self.icon = new L.NodeIcon({
				nodeHtml: L.DomUtil.create('div'),
				className: self.name ? 'marker-place' : 'marker-gray',
			});
			self.marker = new L.Marker(self.loc, {icon: self.icon});
			self.marker.item = self;
			self.marker.on('click mousedown', function(e) {
					if(!this._popup) {
						var div = L.DomUtil.create('div','');
						if(Template[self.templatePopup])
							Blaze.renderWithData(Template[self.templatePopup], self, div);
						this.bindPopup(div.firstChild, { closeButton:false, minWidth:120 });
					}
				}).once('add', function() {
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
	
	isFavorite: function() {
		return Meteor.user() && _.contains(Meteor.user().favorites, this.id);
	},

	checkinsCount: function() {
		this._dep.depend();
		return this.checkins && this.checkins.length;
	},

	getRank: function() {
		this._dep.depend();
		return this.rank;
	}
});

Kepler.extend({
	placesById: {},
	placeById: function(id) {
		check(id, String);
		
		if(!K.placesById[id] && K.findPlaceById(id).fetch()[0])
		{
			K.placesById[id] = new K.Place(id);
			
			if(K.Admin.isMe()) {
				var iname = K.Util.sanitizeFilename(K.placesById[id].name);
				K.Admin.placesByName[iname || id] = K.placesById[id];
			}
		}
		
		return K.placesById[id] || null;
	}
});