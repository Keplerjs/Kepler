

//http://avatars.io/

Template.pageSettings.helpers({
	genders: function() {
		if(Meteor.user()) {
			var gender = Meteor.user() && (Meteor.user().gender || 'none');
			return _.map({male:'male',female:'female',none:'none'}, function(val, k) {
				return {
					key: k,
					val: val,
					name: i18n('ui.genders.'+k),
					active: gender===val
				};
			});
		}
	},	
	places: function() {
		if(Meteor.user()) {
			var places = Meteor.user() && Meteor.user().likeplaces;
			return _.map(Meteor.settings.public.activePlaces, function(k) {
				return {
					val: k,
					name: i18n('ui.places.'+k),
					active: _.contains(places, k)
				};
			});
		}
	},
	langs: function() {
		if(Meteor.user()) {
			var lang = Meteor.user() && Meteor.user().lang;
			return _.map(Meteor.settings.public.langs, function(val, k) {
				return {
					key: k,
					val: val,
					active: k===lang
				};
			});
		}
	},	
	layers: function() {
		if(Meteor.user()) {		
			var layer = Meteor.user().settings.layer || Meteor.settings.public.map.layer;
			return _.map(Meteor.settings.public.layers, function(val, k) {
				return {
					key: k,
					val: k,
					name: i18n('ui.layers.'+k),
					active: k===layer,
					url: _.template(val,{s:'a',z:'15',x:'17374',y:'11667'})
				};
			});
		}
	}	
});
//TODO metodo profile.setSettings

Template.pageSettings.events({

	'keyup #name': _.debounce(function(e) {
		var feed$ = $(e.target).next('.form-control-feedback'),
			val = $(e.currentTarget).val();
		if(!Climbo.util.valid.nameUser(e.target.value)) {
			feed$.show();
		}
		else {
			feed$.hide();
			Meteor.users.update(Meteor.userId(), { $set: {'name': val } });
		}
	}, Meteor.settings.public.typeDelay),

/*	'keyup #email': _.debounce(function(e) {
		var val = $(e.target).val(),
			oldval = $(e.target).data('value'),
			feed$ = $(e.target).next('.form-control-feedback');

		if(!Climbo.util.valid.email(val))
			feed$.show();
		else {
			feed$.hide();
			//TODO
			// Meteor.users.update(Meteor.userId(), {
			// 	$set: {
			// 		emails: [{
			// 			address: val,
			// 			verified: val==oldval
			// 		}]
			// 	}
			// });
		}
	}, Meteor.settings.public.typeDelay),*/

	'keyup #city': _.debounce(function(e) {
		var val = $(e.currentTarget).val();
		Meteor.users.update(Meteor.userId(), { $set: {'city': val } });
	}, Meteor.settings.public.typeDelay),

	'change #likeplaces input': function(e) {
		var val = $(e.currentTarget).val(),
			liked = $(e.currentTarget).is(':checked');

		if(!liked)
			Meteor.users.update(Meteor.userId(), { $pull: {'likeplaces': val } });
		else
			Meteor.users.update(Meteor.userId(), { $addToSet: {'likeplaces': val } });
	},

	'change #maplayer input': _.debounce(function(e) {
		e.preventDefault();
		var val = $(e.currentTarget).val();
		Meteor.users.update(Meteor.userId(), { $set: {'settings.layer': val } });
	}, Meteor.settings.public.typeDelay),

	'change #gender input': _.debounce(function(e) {
		e.preventDefault();
		var val = $(e.currentTarget).val();
		Meteor.users.update(Meteor.userId(), { $set: {'gender': val } });

	}, Meteor.settings.public.typeDelay),

	'change #lang': function(e) {
		e.preventDefault();
		var val = $(e.currentTarget).val();
		Meteor.users.update(Meteor.userId(), { $set: {'lang': val} });
	},

	'change #fileavatar': function(e) {
		e.preventDefault();

		var input$ = $(e.target),
			blob = e.originalEvent.target.files[0];
		
		input$.next().text('');

		if(!Climbo.util.valid.image(blob))
			input$.next().text(
				i18n('errors.imageNotValid') +
				Climbo.util.human.filesize(Meteor.settings.public.maxImageSize)
			);
		else
		{
			input$.parent().addClass('loading-default');
			Climbo.profile.uploadAvatar(blob, function(err, ret) {
				input$.parent().removeClass('loading-default');
			});
		}
	}
});
