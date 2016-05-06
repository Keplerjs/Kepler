/*
	modulo gestione alerts

	disabilitare completamente moduolo se Meteor.settings.public.showAlerts === false

	TODO convertire in modulo con pattern come modules/map.js
	//TODO metodo per ridurre a icona(su un button leaflet) la alerts senza chiuderla
*/

Kepler.alert = {

	_timerHide: null,

	show: function(html, type) {

		type = type || 'info';	//success, info, warning, danger

		var alerts$ = $('#alertlist'),
			list$ = alerts$.find('.list-alerts'),
			btnClose$ = alerts$.find('.alerts-btn-close'),
			last$ = list$.get(0) ? list$.get(0).firstChild : null,
			nAlerts = list$.find('.alert').length,
			maxAlerts = Meteor.settings.public.maxAlerts;
		
		if(list$.get(0))
			Blaze.renderWithData(Template.item_alert,{msg: html, type: type}, list$.get(0), last$);

		if(nAlerts >= maxAlerts) {
			list$.find('.alert:nth-last-child('+(1+nAlerts-maxAlerts)+')')
				.slideUp('slow',function() {
					$(this).remove();
				});
			btnClose$.show();
		}
		else
			btnClose$.hide();

		clearTimeout(K.alert._timerHide);
		K.alert._timerHide = setTimeout(K.alert.hide, 10000);
	},

	hide: function(id) {
		var alerts$ = $('#alertlist'),
			list$ = alerts$.find('.list-alerts'),
			btnClose$ = alerts$.find('.alerts-btn-close');

		btnClose$.hide();
		list$.empty();
	},

	observeConvers: function(conversIds) {
		if(Meteor.settings.public.showAlerts)
			getConversByIds(conversIds).observeChanges({
				added: function(convId, fields) {
					var user = K.newUser(fields.userId);

					console.log('observeConvers CHANGED',fields);
					if(fields.userId != K.profile.id)
						K.alert.show('Nuovo messaggio privato','mes');
				}
			});
	},

	observeUsers: function(usersIds) {
		if(Meteor.settings.public.showAlerts)
			getUsersByIds(usersIds).observeChanges({
				changed: function(userId, fields) {
					var user = K.newUser(userId);
					
					//console.log('CHANGED',user.username,fields);

					if(fields.online)
						K.alert.show(_.template(i18n('alerts.useronline'), user),'success');

					if(fields.loc)
						K.alert.show(_.template(i18n('alerts.usergps'), user),'map-user');

					if(fields.checkin) {
						user.placename = K.newPlace(fields.checkin).name || i18n('labels.noname');
						K.alert.show(_.template(i18n('alerts.usercheckin'), user),'checkin');
					}
				}
			});
	},

// observePlaces: function(placesIds) {
// 	placesIds = _.map(placesIds, function(id) {
// 		return new Meteor.Collection.ObjectID(id);
// 	});
// 	Places.find({_id: {$in: placesIds} }).observeChanges({
// 		changed: function(placeId, fields) {

// 			var place = K.newPlace(placeId._str);
			
// 			console.log(fields.checkins);

// 		 	if(fields.checkins.length > 1 && !_.contains(fields.checkins,K.profile.id))
// 				K.alert.show(_.template(
// 						i18n('alerts.placecheckins'), {
// 							name: place.name,
// 							users: fields.checkins.length
// 						}),'users');
// 		}
// 	});
// },
};
