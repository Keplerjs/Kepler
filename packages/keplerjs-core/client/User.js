/*
	Model for instantiate users
*/
Kepler.User = Class.extend({

	id: null,
	type: 'user',
	template: 'item_user',
	templatePanel: 'panelPlace',	
	templatePopup: 'popupUser',
	templateMarker: 'markerUser',
	data: {},
	
	init: function(userId) {

		var self = this;

		self._id = userId;

		self._dep = new Tracker.Dependency();
		
		self.rData = function() {
			self._dep.depend();
			return self;
		};

		self.update = function(comp) {	//sincronizza istanza con dati nel db

			self.id =  self._id;

			if(self.isMe())
				self.data = K.findCurrentUser(self.id).fetch()[0];
/*			else if(self.isBlockMe())
				self.data = K.findUsersBlockMe(self.id).fetch()[0];*/
			else 
				self.data = K.findFriendById(self.id).fetch()[0];
			
			_.extend(self, self.data);

			if(self.online && self.loc && !self.checkin)
			{
				self.buildMarker();

				K.Map.addItem(self);

				self.marker.setLatLng(self.loc);
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
		
		if(!self.marker) {
			self.icon = new L.NodeIcon({
				className: self.isMe() ? 'marker-profile' : 'marker-friend'
			});
			self.marker = new L.Marker(self.loc, {icon: self.icon});
			self.marker.item = self;
			self.marker.on('click mousedown', function(e) {
				if(!this._popup) {
					var div = L.DomUtil.create('div','');
					if(Template[self.templatePopup])
						Blaze.renderWithData(Template[self.templatePopup], self, div);
					this.bindPopup(div.firstChild, { closeButton:false });
				}
			}).once('add', function() {
				if(Template[self.templateMarker])
					Blaze.renderWithData(Template[self.templateMarker], self, self.icon.nodeHtml);
			});
		}
		return self.marker;
	},

	showLoc: function() {
		var self = this;
		
		self.buildMarker();

		K.Map.showLoc(self.loc, function() {
			self.icon.animate();
		});
	},

	isMe: function() {
		return K.Profile.id === this.id;
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
/*	isBlockMe: function() {
		console.log(this.data)
		return _.contains(this.data.usersBlocked, K.Profile.id);
	},	*/	
	isOnline: function() {
		this._dep.depend();
	//TODO aggiuni this.isMe()
		if(K.Profile.getOnline() && this.isFriend() || this.isMe())
			return this.online;
	},
	getLoc: function() {
		this._dep.depend();	
		if(K.Profile.getOnline() && this.isFriend() || this.isMe())
			return this.loc;
	}
});

Kepler.extend({
	usersById: {},
	userById: function(id) {
		check(id, String);
		
		if(!K.usersById[id] && K.findUserById(id).fetch()[0])
		{
			K.usersById[id] = new K.User(id);
			
			//TODO move to admin moduile
			if(K.Admin.isMe()) {
				var iname = K.Util.sanitizeFilename(K.usersById[id].name);
				K.Admin.usersByName[iname || id] = K.usersById[id];
			}
		}
		
		return K.usersById[id] || null;
	}
});