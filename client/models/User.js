/*
	Classe User
*/
//TODO Climbo.destroyUser = function(userId) {};//eliminare anche marker popup e icon
//TODO nuovo campo near by geonames, se loc attivo senza checkin

Climbo.User = Climbo.Class.extend({

	id: null,
	data: {},					//dati orignali dal db
	cache: {},					//caching for remote data	
	tmpl: Template.item_user,	//template usato nelle liste
	type: 'user',

	init: function(userId) {

		var self = this;

		self.id = userId;		//mongoid
		self._dep = new Deps.Dependency();
		self.rData = function() {	//Data Reactive Source
			self._dep.depend();
			return self;
		};

		self.update = function(comp) {	//sincronizza istanza con dati nel db
			
			self.data = Meteor.users.findOne(self.id);

			_.extend(self, self.data);

			if(self.isMe()) {
				if(self.loc)
					self.showMarker();
				else
					self.hideMarker();
			}
			else {
				if(self.online && self.loc && !self.checkin)
					self.showMarker();
				else
					self.hideMarker();
			}

			self._dep.changed();
		};

		Deps.autorun( self.update );	//TODO aggiornare solo se amico
	},

	loadPanel: function() {
		
		var self = this;

		if(!self.isMe())
			Meteor.subscribe('userById', self.id, function() {
				
				self.update(); //patch per caricare amici

				Climbo.map.loadPanelUser(self.id);
			});
	},

	loadLoc: function() {
		if(this.loc) {
			Climbo.map.loadLoc(this.loc);
			this.icon.animate();
		}
	},

	showMarker: function() {

		var self = this;

		if(!self.marker)
		{
			self.icon = new L.NodeIcon({className: 'marker-'+(self.isMe()?'profile':'friend') });
			self.marker = new L.Marker(self.loc, {icon: self.icon})
			.on('click', function(e) {
				if(!this._popup) {
					self.popup$ = L.DomUtil.create('div','popup-user');
					UI.insert(UI.renderWithData(Template.item_user, self), self.popup$);
					this.bindPopup(self.popup$, { closeButton:false });
				}
			})
			.on('dblclick', function(e) {
				self.loadPanel();
			});
		}
		self.marker.setLatLng(self.loc);
		self.marker.addTo(Climbo.map.leafletMap);
		self.marker._bringToFront();
	},

	hideMarker: function() {
		if(this.marker)
			Climbo.map.leafletMap.removeLayer(this.marker);
	},

	isFriend: function() {
		return Climbo.profile.hasFriend(this.id);
	},

	isMe: function() {
		return Climbo.profile.id === this.id;
	},

	isOnline: function() {
		this._dep.depend();
		if(Climbo.profile.getOnline() && this.isFriend())
			return this.online;
	},

	getLoc: function() {
		this._dep.depend();
		if(Climbo.profile.getOnline() && this.isFriend() && this.online)
			return this.loc;
	},

	checkinPlace: function() {
		this._dep.depend();
		if(Climbo.profile.getOnline() && this.isFriend() && this.online)
			return this.checkin ? Climbo.newPlace(this.checkin).rData() : null;
	}
});

//TODO move to Climbo.Class.newItem()
Climbo.newUser = function(id)
{
	if(!id) return null;
	var i = 'user_'+id;
	if(!Climbo.itemsById[i])
		Climbo.itemsById[i] = new Climbo.User(id);
	return Climbo.itemsById[i];
};