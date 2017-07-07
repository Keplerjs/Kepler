/*
	Module for notifications 
*/
Kepler.Notif = {

	_types: [
		'checkin',
		'success',
		'warning',
		'online',
		'users',
		'mes'
	],

	_timerHide: null,

	init: function() {
		//run observers below
	},

	cleanAll: function() {
		Users.update(Meteor.userId(), {
			$set: {
				notifs: []
			}
		});
	},

	show: function(html, type) {

		type = type || 'info';	//success, info, warning, danger
		
/*
		clearTimeout(K.Notif._timerHide);
		K.Notif._timerHide = setTimeout(K.Notif.hide, 10000);*/
	},
/*
	observeConvers: function(conversIds) {
		if(Meteor.settings.public.showNotifs)
			K.findConversByIds(conversIds).observeChanges({
				added: function(convId, fields) {
					var user = K.userById(fields.userId);

					console.log('observeConvers CHANGED',fields);
					if(fields.userId != K.Profile.id)
						K.Notif.show('Nuovo messaggio privato','mes');
				}
			});
	},

	observeUsers: function(usersIds) {
		if(Meteor.settings.public.showNotifs)
			K.findUsersByIds(usersIds).observeChanges({
				changed: function(userId, fields) {
					var user = K.userById(userId);
					
					//console.log('CHANGED',user.username,fields);

					if(fields.online)
						K.Notif.show( i18n('notifs.useronline', user.name), 'success');

					if(fields.loc)
						K.Notif.show( i18n('notifs.usergps', user.name), 'map-user');

					if(fields.checkin) {
						var place = K.placeById(fields.checkin) || i18n('labels.noname');
						K.Notif.show( i18n('notifs.usercheckin', user.name, place.name), 'checkin');
					}
				}
			});
	}*/
};
