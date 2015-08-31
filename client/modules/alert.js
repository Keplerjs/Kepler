/*
	modulo gestione alerts

	disabilitare completamente moduolo se Meteor.settings.public.showAlerts === false

	TODO convertire in modulo con pattern come Climbo.map.js
	//TODO metodo per ridurre a icona(su un button leaflet) la alerts senza chiuderla
*/

Climbo.alert = {

	_timerHide: null,

	show: function(html, type) {

		//TODO forse includere _.template(i18n('ui.alerts.XXX'),data)
		//in modo da usare Climbo.alert.show(idalert,data)
		
		//if(Meteor.settings.public.showAlerts === false || html==='') return false;
		
		type = type || 'info';	//success, info, warning, danger

		var alerts$ = $('#alertlist'),
			list$ = alerts$.find('.list-alerts'),
			btnClose$ = alerts$.find('.alerts-btn-close'),
			last$ = list$.get(0) ? list$.get(0).firstChild : null,
			nAlerts = list$.find('.alert').length,
			maxAlerts = 3;
		
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

		clearTimeout(Climbo.alert._timerHide);
		Climbo.alert._timerHide = setTimeout(Climbo.alert.hide, 10000);
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
			Convers.find({_id: {$in: conversIds} }).observeChanges({
				added: function(convId, fields) {
					var user = Climbo.newUser(fields.userId);

					console.log('observeConvers CHANGED',fields);
					if(fields.userId != Climbo.profile.id)
						Climbo.alert.show('Nuovo messaggio privato','mes');
				}
			});
	},

	observeUsers: function(usersIds) {
		if(Meteor.settings.public.showAlerts)
			Meteor.users.find({_id: {$in: usersIds} }).observeChanges({
				changed: function(userId, fields) {
					var user = Climbo.newUser(userId);
					
					//console.log('CHANGED',user.username,fields);

					if(fields.online)
						Climbo.alert.show(_.template(i18n('ui.alerts.useronline'), user),'success');

					if(fields.loc)
						Climbo.alert.show(_.template(i18n('ui.alerts.usergps'), user),'map-user');

					if(fields.checkin) {
						user.placename = Climbo.newPlace(fields.checkin).name || i18n('ui.labels.noname');
						Climbo.alert.show(_.template(i18n('ui.alerts.usercheckin'), user),'checkin');
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

// 			var place = Climbo.newPlace(placeId._str);
			
// 			console.log(fields.checkins);

// 		 	if(fields.checkins.length > 1 && !_.contains(fields.checkins,Climbo.profile.id))
// 				Climbo.alert.show(_.template(
// 						i18n('ui.alerts.placecheckins'), {
// 							name: place.name,
// 							users: fields.checkins.length
// 						}),'users');
// 		}
// 	});
// },
};
