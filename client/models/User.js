/*
	Classe User
*/
//TODO K.destroyUser = function(userId) {};//eliminare anche marker popup e icon
//TODO nuovo campo near by geonames, se loc attivo senza checkin

Kepler.User = K.Class.extend({

	id: null,
	type: 'user',
	tmpl: Template.item_user,	//default template for items list	
	data: {},					//dati orignali dal db
	
	init: function(userId) {

		var self = this;

		self.id = userId;		//mongoid
		self._dep = new Tracker.Dependency();
		self.rData = function() {	//Data Reactive Source
			self._dep.depend();
			return self;
		};

		self.update = function(comp) {	//sincronizza istanza con dati nel db
			
			self.data = getFriendById(self.id).fetch()[0];
			
			_.extend(self, self.data);

			if(self.isMe())
			{
				if(self.loc && !self.checkin)
					self.showMarker();
				else
					K.map.removeItem(self);
			}
			else if(self.isFriend())
			{
				if(self.online && self.loc && !self.checkin)
					self.showMarker();
				else
					K.map.removeItem(self);
			}

			self._dep.changed();
			
			return self;
		};
		Tracker.autorun( self.update );	//TODO aggiornare solo se amico
	},

	//PUBLIC METHODS:
	showMarker: function() {

		var self = this;

		if(!self.marker)
		{
			self.icon = new L.NodeIcon({
				className: self.isMe() ? 'marker-profile' : 'marker-friend'
			});
			self.marker = new L.Marker(self.loc, {icon: self.icon});
			self.marker.item = self;
			self.marker.on('click mousedown', function(e) {
				if(!this._popup) {
					self.popup$ = L.DomUtil.create('div','popup-user');
					Blaze.renderWithData(Template.item_user, self, self.popup$);
					this.bindPopup(self.popup$, { closeButton:false });
				}
			}).on('add', function(e) {
				//TODO move also after is added
				this.setLatLng(self.loc);
			});
		}

		K.map.addItem(self);
	},

	loadLoc: function() {
		var self = this;
		
		self.showMarker();

		K.map.loadLoc(self.loc, function() {
			self.icon.animate();
		});
	},

	isFriend: function() {
		return K.profile.hasFriend(this.id);
	},
	isPending: function() {
		return K.profile.hasPending(this.id);
	},
	isReceive: function() {
		return K.profile.hasReceive(this.id);
	},	
	isBlocked: function() {
		return K.profile.hasBlocked(this.id);
	},

	isMe: function() {
		return K.profile.id === this.id;
	},

	isOnline: function() {
		this._dep.depend();
//TODO aggiuni this.isMe()
		if(K.profile.getOnline() && this.isFriend())
			return this.online;
	},

	getLoc: function() {
		this._dep.depend();
//TODO aggiuni this.isMe()		
		if(K.profile.getOnline() && this.isFriend() && this.online)
			return this.loc;
	},

	checkinPlace: function() {
		this._dep.depend();
//TODO aggiuni this.isMe()		
		if(K.profile.getOnline() && this.isFriend() && this.online)
			return this.checkin ? K.newPlace(this.checkin).rData() : null;
	}
});

//TODO move to K.Class.newItem()
K.newUser = function(id) {
	check(id, String);
	
	if(!K.usersById[id] && getUserById(id).fetch()[0])
	{
		K.usersById[id] = new K.User(id);
		//for debugging
		var iname = K.util.sanitizeFilename(K.usersById[id].name);
		K.usersByName[iname || id] = K.usersById[id];
	}
	
	return K.usersById[id] || null;
};

