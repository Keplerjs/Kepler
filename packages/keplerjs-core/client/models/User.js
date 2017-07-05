
Kepler.User = K.Model.extend({

	id: null,
	type: 'user',
	template: 'item_user',
	templatePanel: 'panelPlace',	
	templatePopup: 'popupUser',
	templateMarker: 'markerUser',
	data: {},
	
	init: function(userId) {

		var self = this;

		self.id = userId;

		self._dep = new Tracker.Dependency();
		
		self.rData = function() {
			self._dep.depend();
			return self;
		};

		self.update = function(comp) {	//sincronizza istanza con dati nel db
			
			self.data = K.getFriendById(self.id).fetch()[0];
			
			_.extend(self, self.data);

			if(self.loc && !self.checkin && self.online)
			{
				if(!self.marker)
					self.buildMarker();
				else
					self.marker.setLatLng(self.loc);

				K.Map.addItem(self);
			}
			else
				K.Map.removeItem(self);

			self._dep.changed();
			
			return self;
		};
		Tracker.autorun( self.update );	//TODO aggiornare solo se amico
	},

	buildMarker: function() {

		var self = this;
		self.icon = new L.NodeIcon({
			className: self.isMe() ? 'marker-profile' : 'marker-friend'
		});
		self.marker = new L.Marker(self.loc, {icon: self.icon});
		self.marker.item = self;
		self.marker.on('click mousedown', function(e) {
			if(!this._popup) {
				self.popup$ = L.DomUtil.create('div','popup-'+self.type);
				Blaze.renderWithData(Template[self.templatePopup], self, self.popup$);
				this.bindPopup(self.popup$, { closeButton:false });
			}
		});
	},

	loadLoc: function() {
		var self = this;
		
		self.buildMarker();

		K.Map.loadLoc(self.loc, function() {
			self.icon.animate();
		});
	},

	isFriend: function() {
		return K.Profile.hasFriend(this.id);
	},
	isPending: function() {
		return K.Profile.hasPending(this.id);
	},
	isReceive: function() {
		return K.Profile.hasReceive(this.id);
	},	
	isBlocked: function() {
		return K.Profile.hasBlocked(this.id);
	},

	isMe: function() {
		return K.Profile.id === this.id;
	},

	isOnline: function() {
		this._dep.depend();
//TODO aggiuni this.isMe()
		if(K.Profile.getOnline() && this.isFriend())
			return this.online;
	},

	getLoc: function() {
		this._dep.depend();
//TODO aggiuni this.isMe()		
		if(K.Profile.getOnline() && this.isFriend() && this.online)
			return this.loc;
	}
});

//TODO move to K.Model.newItem()
K.newUser = function(id) {
	check(id, String);
	
	if(!K.usersById[id] && K.getUserById(id).fetch()[0])
	{
		K.usersById[id] = new K.User(id);
		
		if(K.Admin.isMe()) {
			var iname = K.Util.sanitizeFilename(K.usersById[id].name);
			K.usersByName[iname || id] = K.usersById[id];
		}
	}
	
	return K.usersById[id] || null;
};

