
Kepler.Profile = {

	ready: false,

	id: null,
	user: null,			//my istance of K.User	
	data: {},
	placeCheckin: null,

	_deps: {
		online: new Tracker.Dependency()
	},

	init: function(cb) {

		var self = this;
		
		self.ready = true;

		Tracker.autorun(function(comp) {

			self.id = Meteor.userId();
			self.data = Meteor.user();
		
			if(!self.data)	//onlogout
				return self.ready = false;

			self.user = K.newUser(self.id);
			self.user.update();

			if(self.data.checkin)
				self.placeCheckin = K.newPlace(self.data.checkin);
		});

		if(_.isFunction(cb)) cb.call(self);

		return this;
	},
	setOnline: function(online) {
		var self = this;
		online = online ? 1 : 0;
		console.log('setOnline',parseFloat(online))
		if(online !== this.data.online)
			Users.update(Meteor.userId(), {
				$set: {
					online: parseFloat(online),
					mob: parseFloat(K.Util.isMobile() ? 1:0)
				}
			}, function(err) {
				self._deps.online.changed();
			});
		return this;
	},	
	getOnline: function() {
		this._deps.online.depend();
		return !!this.data.online;
	},
	getOpts: function(prop) {
		return K.Util.getPath(this.data,'settings.'+prop);
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
	addCheckin: function(placeId) {
		var self = this;
		Meteor.call('addCheckin', placeId, function() {
			self.placeCheckin = K.newPlace(placeId);
		});
		return this;
	},
	removeCheckin: function(placeId) {
		var self = this;
		Meteor.call('removeCheckin', placeId, function(err) {
			self.placeCheckin = null;
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
