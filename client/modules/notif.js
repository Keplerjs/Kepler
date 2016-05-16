
var notifs$ = $('#alertlist'),
	list$ = notifs$.find('.list-notifs'),
	btnClose$ = notifs$.find('.notifs-btn-close');

Kepler.notif = {

	_types: [
		'checkin',
		'success',
		'warning',
		'online',
		'users',		
		'mes'
	],

	_timerHide: null,

	show: function(html, type) {

		type = type || 'info';	//success, info, warning, danger

		var last$ = list$.get(0) ? list$.get(0).firstChild : null,
			nNotifs = list$.find('.alert').length,
			maxNotifs = Meteor.settings.public.maxNotifs;
		
		if(list$.get(0))
			Blaze.renderWithData(Template.item_alert,{msg: html, type: type}, list$.get(0), last$);

		if(nNotifs >= maxNotifs) {
			list$.find('.alert:nth-last-child('+(1+nNotifs-maxNotifs)+')')
				.slideUp('slow',function() {
					$(this).remove();
				});
			btnClose$.show();
		}
		else
			btnClose$.hide();

		clearTimeout(K.notif._timerHide);
		K.notif._timerHide = setTimeout(K.notif.hide, 10000);
	},

	hide: function(id) {
		btnClose$.hide();
		list$.empty();
	},

	observeConvers: function(conversIds) {
		if(Meteor.settings.public.showNotifs)
			getConversByIds(conversIds).observeChanges({
				added: function(convId, fields) {
					var user = K.newUser(fields.userId);

					console.log('observeConvers CHANGED',fields);
					if(fields.userId != K.profile.id)
						K.notif.show('Nuovo messaggio privato','mes');
				}
			});
	},

	observeUsers: function(usersIds) {
		if(Meteor.settings.public.showNotifs)
			getUsersByIds(usersIds).observeChanges({
				changed: function(userId, fields) {
					var user = K.newUser(userId);
					
					//console.log('CHANGED',user.username,fields);

					if(fields.online)
						K.notif.show( i18n('notifs.useronline', user.name), 'success');

					if(fields.loc)
						K.notif.show( i18n('notifs.usergps', user.name), 'map-user');

					if(fields.checkin) {
						var place = K.newPlace(fields.checkin) || i18n('labels.noname');
						K.notif.show( i18n('notifs.usercheckin', user.name, place.name), 'checkin');
					}
				}
			});
	},

// observePlaces: function(placesIds) {
// 	placesIds = _.map(placesIds, function(id) {
// 		return new Mongo.Collection.ObjectID(id);
// 	});
// 	Places.find({_id: {$in: placesIds} }).observeChanges({
// 		changed: function(placeId, fields) {
// 			var place = K.newPlace(placeId._str);
// 		 	if(fields.checkins.length > 1 && !_.contains(fields.checkins,K.profile.id))
// 				K.notif.show( i18n('notifs.placecheckins', fields.checkins.length, place.name), 'users');
// 		}
// 	});
// },
};
