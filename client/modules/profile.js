
Kepler.profile = {

	ready: false,

	id: null,
	user: null,			//my istance of K.User	
	data: {},
	mapSets: {},		//map custom settings used in K.map.initMap(...)
	placeCheckin: null,
	notifs: [],			//notifs of user
	//TODO rename fields in db notif to notifs

	_deps: {
		online: new Tracker.Dependency(),
		checkin: new Tracker.Dependency()
	},

	initProfile: function(cb) {

		var self = this;

		if(!Meteor.user() && self.ready) return this;
		
		self.ready = true;

		Tracker.autorun(function(comp) {

			self.id = Meteor.userId();
			self.data = Meteor.user();
		
			if(!self.data)	//onlogout
				return self.ready = false;

			//show user marker quando la mappa è ancora pronta
			self.user = K.newUser(self.data._id);
			self.user.update();

			//TODO i18n.setLanguage(self.data.lang);

			if(self.data.checkin)
				self.placeCheckin = K.newPlace(self.data.checkin);

			$('#friends #switch_online').bootstrapSwitch('state', self.data.online);
		});

		if($.isFunction(cb)) cb.call(self);

		return this;
	},
	getData: function() {
		return Meteor.user();
	},
	getOnline: function() {
		this._deps.online.depend();
		return !!this.data.online;
	},
	getCheckin: function() {
		this._deps.checkin.depend();
		if(this.placeCheckin)
			return this.placeCheckin.rData();
	},
	getFriends: function() {
		return  _.map(_.compact(this.data.friends), function(userId) {
			var user = K.newUser(userId);
			return user && user.rData();
		});
	},
	hasFriend: function(userId) {
		return _.contains(this.data.friends, userId);
	},
	hasPending: function(userId) {
		return _.contains(this.data.usersPending, userId);
	},
	hasReceive: function(userId) {
		return _.contains(this.data.usersReceive, userId);
	},
	hasBlocked: function(userId) {
		return _.contains(this.data.usersBlocked, userId);
	},
	friendAdd: function(userId) {
		Meteor.call('friendAdd', userId);
		return this;
	},
	friendConfirm: function(userId) {
		Meteor.call('friendConfirm', userId);
		return this;
	},	
	friendDel: function(userId) {
		Meteor.call('friendDel', userId);
		return this;
	},
	friendBlock: function(userId) {
		Meteor.call('friendBlock', userId);
		return this;
	},
	setLoc: function(loc) {
		Meteor.call('setUserLoc', loc);
		return this;
	},
	setOnline: function(online) {
		var self = this;
		online = online ? 1 : 0;
		if(online !== this.data.online)
			Users.update(Meteor.userId(), {
				$set: {
					online: parseFloat(online),
					mob: parseFloat(Meteor.Device.isPhone() ? 1:0)
				}
			}, function(err) {
				self._deps.online.changed();
			});
		return this;
	},
	addCheckin: function(placeId) {
		var self = this;
		Meteor.call('addCheckin',placeId, function() {
			self.placeCheckin = K.newPlace(placeId);
			self._deps.checkin.changed();
		});
		return this;
	},
	removeCheckin: function(placeId) {
		var self = this;
		Meteor.call('removeCheckin',placeId, function(err) {
			self.placeCheckin = null;
			self._deps.checkin.changed();			
		});
		return this;
	},
	addFavorite: function(placeId) {
		Meteor.call('addFavorite', placeId);
		return this;
	},
	removeFavorite: function(placeId) {
		Meteor.call('removeFavorite', placeId);
		return this;
	},
	logout: function() {
		var self = this;
		self.setOnline(false);
		self.ready = false;
		Meteor.logout(function(err) {
			//TODO esegui K.map.destroyMap();			
		});
		return this;
	}
};
