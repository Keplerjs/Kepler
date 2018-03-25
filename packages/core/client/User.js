/**
 * user instances index
 * @type {Object}
 */
Kepler.usersById = {};

/**
 * create new User instance or return it if exists
 * @param  {String} id Mongo Id
 * @return {User}   K.User instance
 */
Kepler.userById = function(id) {
	check(id, String);
	
	if(!K.usersById['id_'+id] && K.findUserById(id).fetch()[0])
		K.usersById['id_'+id] = new K.User(id);
	
	return K.usersById['id_'+id] || null;
};

/**
 * Model for instantiate users
 * @param  {[type]} userId) {		var       self [description]
 * @return {[type]}         [description]
 */
Kepler.User = Class.extend({

	id: null,
	type: 'user',
	template: 'item_user',
	templatePanel: 'panelPlace',	
	templatePopup: 'popupUser',
	templateMarker: 'markerUser',
	iconClassName: 'marker-profile',
	data: {},
	
	init: function(userId) {

		var self = this;

		self._id = userId;

		self._dep = new Tracker.Dependency();
		
		self.rData = function() {
			self._dep.depend();
			return self;
		};
		
		if(!self.isMe())
			self.iconClassName = 'marker-friend';
		
		//self.update = function(){};
		//Tracker.autorun(function() {	//sincronizza istanza con dati nel db
		self.update = function() {
			self.id =  self._id;

			if(self.isMe())
				self.data = K.findCurrentUser(self.id).fetch()[0];
			else 
				self.data = K.findFriendById(self.id).fetch()[0];
			
			_.extend(self, self.data);

			if(self.status==='online' && self.loc && !self.checkin)
			{
				self.buildMarker();

				K.Map.addItem(self);

				//TODO REFACT draw user track
				//build self.polyline... and udate it each time
				if(K.Map.ready()) {
					L.polyline([self.marker.getLatLng(), self.loc], {
						opacity:0.8, weight:3, dashArray: "1,6", color: self.color
					})
					.addTo(K.Map.layers.geojson);
				}

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
			var iconOpts = K.settings.public.map.icon;
			self.icon = new L.NodeIcon({
				/*conSize: new L.Point(iconOpts.iconSize),
				iconAnchor: new L.Point(iconOpts.iconAnchor),
				popupAnchor: new L.Point(iconOpts.popupAnchor),*/
				nodeHtml: L.DomUtil.create('div'),
				className: self.iconClassName
			});
			self.marker = new L.Marker(self.loc, {icon: self.icon});
			self.marker.item = self;
			self.marker.on('click', function(e) {
				if(!this._popup) {
					var div = L.DomUtil.create('div','');
					if(Template[self.templatePopup])
						Blaze.renderWithData(Template[self.templatePopup], self, div);
					this.bindPopup(div.firstChild, K.Map.options.popup);
				}
			}).once('add', function() {
				if(Template[self.templateMarker])
					Blaze.renderWithData(Template[self.templateMarker], self.rData, self.icon.nodeHtml);
			});

			self.color = K.Util.textToColor(self.id);
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
	isBlockMe: function() {
		return _.contains(this.data.usersBlocked, K.Profile.id);
	},
	isOnline: function() {
		this._dep.depend();
		if(K.Profile.getOnline() && this.isFriend() || this.isMe())
			return this.status==='online';
	},
	getLoc: function() {
		this._dep.depend();	
		if(K.Profile.getOnline() && this.isFriend() || this.isMe())
			return this.loc;
	},
	getCheckin: function() {
		this._dep.depend();	
		if(K.Profile.getOnline() && this.isFriend() || this.isMe())
			return this.checkin;
	},
	getFullname: function() {
		return this.username!==this.name ? this.username+' ('+this.name+')': this.username;
	}
});
