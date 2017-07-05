
Kepler.Place = K.Model.extend({

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

			self.data = K.getPlaceById(self.id).fetch()[0];
			
			_.extend(self, self.data);

			if(self.loc) {
				if(!self.marker)
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

		self.icon = new L.NodeIcon({
			nodeHtml: L.DomUtil.create('div'),
			className: (self.name ? 'marker-'+self.type : 'marker-gray'),
		});
		self.marker = new L.Marker(self.loc, {icon: self.icon});
		self.marker.item = self;
		self.marker.on('click mousedown', function(e) {
				if(!this._popup) {
					self.popup$ = L.DomUtil.create('div','popup-place');
					Blaze.renderWithData(Template[self.templatePopup], self, self.popup$);
					this.bindPopup(self.popup$, { closeButton:false, minWidth:120 });
				}
			}).once('add', function() {
				Blaze.renderWithData(Template[self.templateMarker], self, self.icon.nodeHtml);
			});
	},

	loadLoc: function() {		//TODO rename loadLoc in showLoc
		var self = this;
		
		self.buildMarker();

		K.Map.loadLoc(self.loc, function() {
			self.icon.animate();
		});
	},
	
	isOutdoor: function() {
		return this.type != 'indoor';
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
	conversCount: function() {
		this._dep.depend();
		return this.convers && this.convers.length;
	},

	getRank: function() {
		this._dep.depend();
		return this.rank;
	}
});

//TODO move to K.Model.newItem()
K.newPlace = function(id) {
	check(id, String);
	
	if(!K.placesById[id] && K.getPlaceById(id).fetch()[0])
	{
		K.placesById[id] = new K.Place(id);
		
		if(K.Admin.isMe()) {
			var iname = K.Util.sanitizeFilename(K.placesById[id].name);
			K.placesByName[iname || id] = K.placesById[id];
		}
	}
	
	return K.placesById[id] || null;
};

