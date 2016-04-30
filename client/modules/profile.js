
Climbo.profile = {

	ready: false,

	id: null,
	user: null,			//my istance of Climbo.User	
	data: {},
	mapSets: {},		//map custom settings used in Climbo.map.initMap(...)
	placeCheckin: null,
	notifs: [],			//notifs of user
	//TODO rename fields in db notif to notifs

	_deps: {
		online: new Tracker.Dependency(),
		checkin: new Tracker.Dependency()
	},

	initProfile: function(cb) {

		var self = this;

		if(self.ready) return this;
		
		self.ready = true;

		Tracker.autorun(function(comp) {

			self.id = Meteor.userId();
			self.data = Meteor.user();
			
			if(!self.data)
				return false;

			self.data = self.data;

			if(Climbo.map.ready)
				Climbo.map.setOpts({
					layer: self.data.settings.layer,
					center: self.data.locmap
				});

			//show user marker quando la mappa è ancora pronta
			self.user = Climbo.newUser(self.data._id);
			self.user.update();

			//TODO i18n.setLanguage(self.data.lang);

			if(self.data.checkin)
				self.placeCheckin = Climbo.newPlace(self.data.checkin);

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
			return Climbo.newUser(userId).rData();
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
	userBlock: function(userId) {
		//TODO
		return this;
	},

	setLoc: function(loc) {
		// loc = loc || null;
		// var shift = Climbo.util.geo.distance(this.data.loclast, loc);
		// if(loc===null || shift >= Meteor.settings.public.gpsMinShift)
		//problems when loclast===loc(just gps switched on)
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
			self.placeCheckin = Climbo.newPlace(placeId);
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
	uploadAvatar: function(fileObj, cb) {
		
		if(this.fileReader)
			this.fileReader.abort();
		else
			this.fileReader = new FileReader();
			
		if(true || Climbo.util.valid.image(fileObj)) {
			this.fileReader.onloadend = function(e) {
				Meteor.call('uploadAvatar', {
					name: fileObj.name,
					type: fileObj.type,
					size: fileObj.size,
					blob: e.target.result
				}, cb);
			}
			this.fileReader.readAsBinaryString(fileObj);
		}
		else
			cb({message: i18n('errors.imageNotValid') + Climbo.util.human.filesize(Meteor.settings.public.maxImageSize) });

		return this;
	},
	logout: function() {
		var self = this;
		self.setOnline(false);
		Meteor.logout(function(err) {
			//TODO esegui Climbo.map.destroyMap();
		});
		return this;
	}
};
