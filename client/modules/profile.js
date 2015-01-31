/*
	Climbo.profile è il modulo di gestione dell' utente loggatoq
	e di tutti i dati reattivi collegati all'utente: favorites, friends, checkin 
*/

Climbo.profile = {

	initialized: false,

	id: null,
	data: {},
	user: null,		//my istance of Climbo.User
	placeCheckin: null,
	friends: [],	//istances of friends
	convers: [],	//convers

	_deps: {
		online: new Deps.Dependency(),
		checkin: new Deps.Dependency(),
		friends: new Deps.Dependency()
	},

	initProfile: function() {

		//console.log('Climbo.profile.initProfile');

		Climbo.profile.initialized = true;

		Deps.autorun(function(comp) {

			var userData = Meteor.user();
			
			//console.log('Climbo.profile.autorun',userData);

			if(!userData)	//userData not logget
				return false;	//unset profile.user, profile.id, Climbo.profile.data

			Climbo.profile.id = userData._id;
			Climbo.profile.data = userData;
			Climbo.profile.user = Climbo.newUser(userData._id);
			Climbo.profile.user.update();

			if(this.firstRun && Climbo.map.leafletMap && Climbo.profile.data.locmap)
				Climbo.map.leafletMap.setView(Climbo.profile.data.locmap, Meteor.settings.public.map.zoom);

			//TODO Meteor.settings.public.profile = _.defaults(Meteor.settings.public.profile, userData.settings);
			
			//TODO rifare le subscribe solo se cambia il valore dopo autorun
			Climbo.profile.loadFriends();
			Climbo.profile.loadCheckin();

			$('#friends #switch_online').bootstrapSwitch('state', Climbo.profile.data.online);
			//patch for sync online state after switch_online.rendered
		});
	},
	getOnline: function() {
		Climbo.profile._deps.online.depend();
		return !!Climbo.profile.data.online;
	},
	getCheckin: function() {
		Climbo.profile._deps.checkin.depend();
		return Climbo.profile.placeCheckin;
	},
	getFriends: function() {
		Climbo.profile._deps.friends.depend();
		return Climbo.profile.friends;
	},
	hasFriend: function(userId) {
		Climbo.profile._deps.friends.depend();
		return _.contains(Climbo.profile.data.friends, userId);
	},	

	setLoc: function(loc) {
		// loc = loc || null;
		// var shift = Climbo.util.geo.distance(Climbo.profile.data.loclast, loc);
		// if(loc===null || shift >= Meteor.settings.public.gpsMinShift)
		//problemi quando loclast==loc(appena si accende il gps)
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
	addFriend: function(userId) {
		Meteor.call('addFriend', userId);
	},
	removeFriend: function(userId) {
		Meteor.call('removeFriend', userId);
	},
	uploadAvatar: function(blob, callback) {
		var fileReader = new FileReader();
		fileReader.onload = function(file) {
			Meteor.call('uploadAvatar',file.target.result, callback);
		}
		fileReader.readAsBinaryString(blob);
	},

	loadCheckin: function() {
		if(Climbo.profile.data.checkin)
			Meteor.subscribe('placeById', Climbo.profile.data.checkin, function() {
				Climbo.profile.placeCheckin = Climbo.newPlace(Climbo.profile.data.checkin);
				Climbo.profile._deps.checkin.changed();
				//Climbo.alerts.observePlaces([Climbo.profile.data.checkin]);
			});
		else
			Climbo.profile.placeCheckin = null;
	},
	loadFriends: function() {
		if(Climbo.profile.data.friends && Climbo.profile.data.friends.length > 0)
			Meteor.subscribe('friendsByIds', Climbo.profile.data.friends, function() {
				Climbo.profile.friends = _.map(Climbo.profile.data.friends, Climbo.newUser);
				Climbo.profile._deps.friends.changed();
				//Climbo.alerts.observeUsers(Climbo.profile.data.friends);
			});
		else
			Climbo.profile.friends = [];
	},
	loadConvers: function() {
		if(Climbo.profile.data.convers && Climbo.profile.data.convers.length > 0)
			Meteor.subscribe('conversByIds', Climbo.profile.data.convers, function() {
				
				Climbo.profile.convers = getConversByIds(Climbo.profile.data.convers).fetch();

				Climbo.dialogList.show({
					title: '<i class="icon icon-mes"></i> Messaggi',
					className: 'convers_profile',
					template: 'item_conver',
					items: Climbo.profile.convers,
					//TODO lastMsg sortby: 'updateAt',
					desc: true
				});
			});
		else
			Climbo.profile.convers = [];
	},
	loadFavorites: function() {
		if(Climbo.profile.data.favorites.length > 0)
			Meteor.subscribe('placesByIds', Climbo.profile.data.favorites, function() {
				Climbo.dialogList.show({
					title: '<i class="icon icon-star"></i> '+Climbo.i18n.ui.titles.favs,
					className: 'favorites',
					template: 'item_favorite',
					items: _.map(Climbo.profile.data.favorites, Climbo.newPlace),
					sortby: 'name'
				});
			});
	},	
	loadNotif: function() {
		if(Climbo.profile.data.notif.length > 0)
			//Meteor.subscribe('notifsByIds', Climbo.profile.data.convers, function() {
				
				Climbo.dialogList.show({
					title: '<i class="icon icon-notif"></i> Notifiche',
					className: 'notif',
					template: 'item_notif',
					items: _.map(Climbo.profile.data.notif, function(convId) {
						//item.tmpl = Template.item_notif;
						return null;
					})
				});
			//});
	},
	logout: function() {
		Climbo.profile.setOnline(false);
		Meteor.logout(function(err) {
			//TODO esegui Climbo.map.destroyMap();
			Climbo.profile.initialized = false;
		});
	}
};
