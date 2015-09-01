/*
	Questo è il modulo di gestione dell' utente loggato
	e di tutti i dati reattivi collegati all'utente: favorites, friends, checkin 
*/

Climbo.profile = {

	initialized: false,

	id: null,
	data: {},
	user: null,			//my istance of Climbo.User
	mapSets: null,		//map custom settings used in Climbo.map.initMap(...)
	placeCheckin: null,
	notifs: [],			//notifs of user
	//TODO rename fields in db notif to notifs

	_deps: {
		online: new Tracker.Dependency(),
		checkin: new Tracker.Dependency(),
		pending: new Tracker.Dependency()
	},

	initProfile: function(callbackProfile) {

		if(Climbo.profile.initialized)
			return false;
		
		Climbo.profile.initialized = true;

		Tracker.autorun(function(comp) {

			var userData = Meteor.user();
			
			if(!userData)	//userData not logget
				return false;	//unset profile.user, profile.id, Climbo.profile.data

			Climbo.profile.id = userData._id;
			Climbo.profile.data = userData;
			Climbo.profile.user = Climbo.newUser(userData._id);
			Climbo.profile.user.update();

			Climbo.profile.mapSets = _.extend(Meteor.settings.public.map, {
				layer: userData.settings.layer,
				center: userData.locmap
			});

/*			if(Climbo.map.initialized)
				Climbo.map.setOpts(Climbo.profile.mapSets);
*/

			//TODO i18n.setLanguage(userData.lang);


			
			if(userData.checkin)
				Climbo.profile.placeCheckin = Climbo.newPlace(userData.checkin);

			$('#friends #switch_online').bootstrapSwitch('state', userData.online);
		});

		if($.isFunction(callbackProfile))
			callbackProfile(Climbo.profile);
	},
	getData: function() {
		return Meteor.user();
	},
	getOnline: function() {
		Climbo.profile._deps.online.depend();
		return !!Climbo.profile.data.online;
	},
	getCheckin: function() {
		Climbo.profile._deps.checkin.depend();
		if(Climbo.profile.placeCheckin)
			return Climbo.profile.placeCheckin.rData();
	},
	hasFriend: function(userId) {
		return _.contains(Climbo.profile.data.friends, userId);
	},
	hasPending: function(userId) {
		//Climbo.profile._deps.pending.depend();
		return _.contains(Climbo.profile.data.usersPending, userId);
	},
	hasReceive: function(userId) {
		//Climbo.profile._deps.pending.depend();
		return _.contains(Climbo.profile.data.usersReceive, userId);
	},
	friendAdd: function(userId) {
		Meteor.call('friendAdd', userId);
	},
	friendConfirm: function(userId) {
		Meteor.call('friendConfirm', userId);
	},	
	friendDel: function(userId) {
		Meteor.call('friendDel', userId);
	},
	userBlock: function(userId) {
		//TODO
	},

	setLoc: function(loc) {
		// loc = loc || null;
		// var shift = Climbo.util.geo.distance(Climbo.profile.data.loclast, loc);
		// if(loc===null || shift >= Meteor.settings.public.gpsMinShift)
		//problems when loclast===loc(just gps switched on)
		Meteor.call('setUserLoc', loc);
	},
	setOnline: function(online) {
		online = online ? 1 : 0;
		if(online !== Climbo.profile.data.online)
			Meteor.users.update(Meteor.userId(), {
				$set: {
					online: parseFloat(online),
					mob: parseFloat(Meteor.Device.isPhone() ? 1:0)
				}
			}, function(err) {
				Climbo.profile._deps.online.changed();
			});
	},
	addCheckin: function(placeId) {
		Meteor.call('addCheckin',placeId, function() {
			Climbo.profile.placeCheckin = Climbo.newPlace(placeId);
			Climbo.profile._deps.checkin.changed();
		});
	},
	removeCheckin: function(placeId) {
		Meteor.call('removeCheckin',placeId, function(err) {
			Climbo.profile.placeCheckin = null;
			Climbo.profile._deps.checkin.changed();			
		});
	},
	addFavorite: function(placeId) {
		Meteor.call('addFavorite', placeId);
	},
	removeFavorite: function(placeId) {
		Meteor.call('removeFavorite', placeId);
	},
	uploadAvatar: function(blob, callback) {
		var fileReader = new FileReader();
		fileReader.onload = function(file) {
			Meteor.call('uploadAvatar',file.target.result, callback);
		}
		fileReader.readAsBinaryString(blob);
	},
	logout: function() {
		Climbo.profile.setOnline(false);
		Meteor.logout(function(err) {
			//TODO esegui Climbo.map.destroyMap();
		});
	}
};
