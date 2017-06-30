
Kepler.Place = K.Class.extend({

	id: null,
	type: 'place',
	template: 'item_place',		//default item template
	data: {},					//dati orignali dal db
	
	init: function(placeId) {

		var self = this;

		self.id = placeId;

		self._dep = new Tracker.Dependency();

		self.rData = function() {
			self._dep.depend();
			return self;
		};

		self.update = function(comp) {	//sincronizza istanza con dati nel db

			self.data = getPlaceById(self.id).fetch()[0];
			
			_.extend(self, self.data);

			if(self.loc) {
				if(!self.marker)
					self.buildMarker();

				K.map.addItem(self);
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
					self.popup$ = L.DomUtil.create('div','');
					Blaze.renderWithData(Template.item_place_popup, self, self.popup$);
					this.bindPopup(self.popup$, { closeButton:false });
				}
			}).once('add', function() {
				Blaze.renderWithData(Template.item_place_marker, self, self.icon.nodeHtml);
			});
	},

	loadLoc: function() {
		var self = this;
		
		self.buildMarker();

		K.map.loadLoc(self.loc, function() {
			self.icon.animate();
		});
	},
	
	isOutdoor: function() {
		return this.type != 'indoor';
	},

	isCheckin: function() {
		return K.profile.data.checkin && (K.profile.data.checkin === this.id);
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

//TODO move to K.Class.newItem()
K.newPlace = function(id) {
	check(id, String);
	
	if(!K.placesById[id] && getPlaceById(id).fetch()[0])
	{
		K.placesById[id] = new K.Place(id);
		
		//debugging
		var iname = K.util.sanitizeFilename(K.placesById[id].name);
		K.placesByName[iname || id] = K.placesById[id];
	}
	
	return K.placesById[id] || null;
};

