Climbo.Place = Climbo.Class.extend({

	id: null,
	data: {},					//dati orignali dal db
	cache: {},					//caching for remote data	
	type: 'place',
	tmpl: Template.item_place,	//template for items list	

	init: function(placeId) {

		var self = this;

		self.id = placeId;

		//REACTIVE SOURCES:
		self._dep = new Tracker.Dependency();
		self.rData = function() {
			self._dep.depend();
			return self;
		};

		self.update = function(comp) {	//sincronizza istanza con dati nel db

			self.data = Places.findOne(new Meteor.Collection.ObjectID(self.id));

			if(!self.data)
				return false;
			
			_.extend(self, self.data);

			self._dep.changed();
		};
		Tracker.autorun( self.update );

		//MAP OBJECTS:
		self.icon = new L.NodeIcon({
			nodeHtml: L.DomUtil.create('div'),
			className: (self.name ? 'marker-'+self.type : 'marker-gray'),
		});
		self.marker = new L.Marker(self.loc, {icon: self.icon});
		self.marker.item = self;
		self.marker.on('add', function() {
				Blaze.renderWithData(Template.marker_checkins, self, self.icon.nodeHtml);
			})
			.on('click mousedown', function(e) {
				if(!this._popup) {
					self.popup$ = L.DomUtil.create('div','popup-place');
					Blaze.renderWithData(Template.popup_place, self, self.popup$);
					this.bindPopup(self.popup$, { closeButton:false, minWidth:180, maxWidth:320 });
				}
			});

	},

	//PUBLIC METHODS:
	loadLoc: function() {
		var self = this;
		Climbo.map
			.loadItem(self);
		Climbo.map.loadLoc(self.loc, function() {
				self.icon.animate();
			});
	},

	hideMarker: function() {
		if(this.marker && this.marker._map)
			this.marker._map.removeLayer(this.marker);
	},
	
	isOutdoor: function() {
		return this.type != 'indoor';
	},

	isCheckin: function() {
		//return Meteor.user() && (Meteor.user().checkin === this.id);
		var place = Climbo.profile.getCheckin();
		return place && place.id === this.id;
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

//TODO move to Climbo.Class.newItem()
Climbo.newPlace = function(id)
{
	if(!id) return null;
	if(!Climbo.placesById[id])
		Climbo.placesById[id] = new Climbo.Place(id);
	
	//for debugging
	var iname = Climbo.util.sanitizeFilename(Climbo.placesById[id].name);
	Climbo.placesByName[iname || id] = Climbo.placesById[id];

	return Climbo.placesById[id];
};

