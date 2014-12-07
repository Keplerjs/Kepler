/*
	Classe User
*/
//TODO Climbo.destroyUser = function(userId) {};//eliminare anche marker popup e icon
//TODO nuovo campo near by geonames, se loc attivo senza checkin

Climbo.User = function(userId)
{
	var self = this;

	self.id = userId;		//mongoid
	self.data = {};			//dati originali dal db vedi server/accounts.js
	self.tmpl = Template.item_user;	//template usato nelle liste
	
	self._dep = new Deps.Dependency();

//METODI PUBBLICI
	
	//TODO rinominare in rData o reactiveData
	self.rData = function() {	//Data Reactive Source
		self._dep.depend();
		return self;
	};

	self.loadPanel = function() {
		if(!self.isMe())
			Meteor.subscribe('userById', self.id, function() {
				
				self.update(); //patch per caricare amici

				Climbo.map.loadPanelUser(self.id);
			});
	};
	self.loadLoc = function() {
		if(self.loc) {
			Climbo.map.loadLoc(self.loc);
			self.icon.animate();
		}
	};
	self.showMarker = function() {
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
	};
	self.hideMarker = function() {
		if(self.marker)
			Climbo.map.leafletMap.removeLayer(self.marker);
	};
	self.isFriend = function() {
		return Climbo.profile.hasFriend(self.id);
	};
	self.isMe = function() {
		return Climbo.profile.id === self.id;
	};
	self.isOnline = function() {
		self._dep.depend();
		if(Climbo.profile.getOnline() && self.isFriend())
			return self.online;
	};
	self.getLoc = function() {
		self._dep.depend();
		if(Climbo.profile.getOnline() && self.isFriend() && self.online)
			return self.loc;
	};
	self.checkinPlace = function() {
		self._dep.depend();
		if(Climbo.profile.getOnline() && self.isFriend() && self.online)
			return self.checkin ? Climbo.newPlace(self.checkin).rData() : null;
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
};

Climbo.User.include = function (props) {
	_.extend(this.prototype, props);
};

Climbo.newUser = function(userId)
{
	if(!userId) return null;
	if(!Climbo.usersById[ userId ])
		Climbo.usersById[ userId ] = new Climbo.User(userId);
	Climbo.usersByName[ Climbo.usersById[ userId ].username ] = Climbo.usersById[ userId ];
	return Climbo.usersById[ userId ];
};
