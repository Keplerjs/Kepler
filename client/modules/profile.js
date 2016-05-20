
Kepler.profile = {

	ready: false,

	id: null,
	user: null,			//my istance of K.User	
	data: {},
	placeCheckin: null,

	_deps: {
		online: new Tracker.Dependency(),
		checkin: new Tracker.Dependency()
	},

	initProfile: function(cb) {

		var self = this;

		if(!Meteor.user()) return this;
		
		self.ready = true;

		Tracker.autorun(function(comp) {

			self.id = Meteor.userId();
			self.data = Meteor.user();
		
			if(!self.data)	//onlogout
				return self.ready = false;

			//show user marker quando la mappa è ancora pronta
			self.user = K.newUser(self.data._id);
			self.user.update();

			if(self.data.checkin)
				self.placeCheckin = K.newPlace(self.data.checkin);
		});

		if(_.isFunction(cb)) cb.call(self);

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
	getSets: function(prop) {
		return K.util.getPath(this.data,'settings.'+prop);
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
		Meteor.call('setLoc', loc);
		return this;
	},
	setOnline: function(online) {
		var self = this;
		online = online ? 1 : 0;
		if(online !== this.data.online)
			Users.update(Meteor.userId(), {
				$set: {
					online: parseFloat(online),
					mob: parseFloat(K.util.isMobile() ? 1:0)
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
		this.setOnline(false);
		this.ready = false;
		Meteor.logout();
		return this;
	}
};
