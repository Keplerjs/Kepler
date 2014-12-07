/*
	modulo gestione conversazioni e messaggi privati

	TODO!!! emoticons e users tag
	http://ichord.github.io/At.js/
*/

Climbo.convers = {
	// getMsgsMore: function(convId,num) {
	// 	//TODO return	_.initial(msgs, 3);
	// 	return [];
	// },
	// getMsgsLast: function(convId) {
	// 	if(Session.get('dialogConverId'))
	// 	{
	// 		var convData = getConverById( Session.get('dialogConverId') ).fecth()[0];
	// 		return convData ? convData.msgs : [];
	// 	}
	// },
	show: function(convId) {
		if(!convId) return false;
		var dialog$ = $('#dialogconver'),
			title$ = dialog$.find('.modal-title');
		
		Meteor.subscribe('converById', convId, function() { //TODO converWithUser

			var convData = getConverById(convId).fetch()[0],
				title = convData.title || Climbo.i18n.ui.titles.msgpriv,
				place = Climbo.newPlace(convData.placeId),
				placeName = convData.placeId ? _.str.capitalize(place.name)+': ' : '',
				usersItems = _.map(convData.usersIds, Climbo.newUser);

			title$.html('<i class="icon icon-mes"></i> '+ placeName + title  );
			
			Session.set('dialogConverId', convId);
			
			Climbo.dialogList.hide();
			dialog$.modal();
			dialog$.find('.conver-input textarea').focus();
		});
	},

	loadConverWithUser: function(userId) {
		Meteor.call('getConverWithUser', userId, function(err, convId) {
			Climbo.convers.show(convId);
		});
	},

	newConverInPlace: function(placeId, title) {
		Meteor.call('newConverInPlace', placeId, title, function(err, convId) {
			Climbo.convers.show(convId);
		});
	},

	addMsgToConver: function(convId, body) {	//TODO spostare lato server
		
		body = Climbo.util.sanitizeMsg(body);
		//sposta in Messages.allow

		if(!_.str.isBlank(body))
			addMsgToConver(convId, body);
			// Meteor.call('addMsgToConver', convId, body, function(err) {
				
			// });
	},

	delConver: function(convId) {
		Meteor.call('delConver', convId);
	},

	hide: function() {
		var dialog$ = $('#dialogconver'),
		 	title$ = dialog$.find('.modal-title'),
			list$ = dialog$.find('.modal-body');

		console.log('Climbo.convers.hide');

		dialog$.modal('hide');
		title$.empty();
		//list$.empty();
		//FIXME causa cancellazione prematura dei mesagggi
		//forse xke elimina il frammento di html reattivo relativo al template conver_list
	}
};






