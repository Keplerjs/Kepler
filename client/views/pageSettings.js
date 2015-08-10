

//http://avatars.io/

Template.pageSettings.helpers({
	places: function() {
		return _.map(Meteor.settings.public.activePlaces, function(type) {
			return {
				type: type,				
				name: i18n('ui.places.'+type),				
				liked: _.contains(Meteor.user().likeplaces, type)
			};
		});
	},
	langs: function() {
		if(Meteor.user()) {
			var lang = Meteor.user() && Meteor.user().lang;
			return _.map(Meteor.settings.public.langs, function(val, key) {
				return { key: key, val: val, active: key===lang };
			});
		}
	}
});
//TODO metodo profile.setSettings

Template.pageSettings.events({

	'keyup #name': _.debounce(function(e) {
		var feed$ = $(e.target).next('.form-control-feedback');
		if(!Climbo.util.valid.nameUser(e.target.value))
			feed$.show();
		else {
			feed$.hide();
			Meteor.users.update(Meteor.userId(), { $set:{name: e.target.value} });
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
		Meteor.users.update(Meteor.userId(), { $set:{city: e.target.value} });
	}, Meteor.settings.public.typeDelay),

	'click #likeplaces a': _.debounce(function(e) {
		e.preventDefault();
		var $a = $(e.originalEvent.target),
			type = $a.data('type'),
			liked = $a.data('liked');

		if(liked)
			Meteor.users.update(Meteor.userId(), { $pull: {likeplaces: type} });
		else
			Meteor.users.update(Meteor.userId(), { $addToSet: {likeplaces: type} });

	}, Meteor.settings.public.typeDelay),


	'change #lang': function(e) {
		e.preventDefault();
		var lang = $(e.currentTarget).val();
		sMeteor.users.update(Meteor.userId(), { $set: {'lang': lang} });
	},

	'change #fileavatar': function(e) {
		e.preventDefault();

		var input$ = $(e.target),
			file = e.originalEvent.target.files[0];
		
		input$.next().text('');

		if(!Climbo.util.valid.image(file))
			input$.next().text(
				i18n('errors.imageNotValid') +
				Climbo.util.human.filesize(Meteor.settings.public.maxImageSize)
			);
		else
		{
			input$.parent().addClass('loading-default');
			Climbo.profile.uploadAvatar(file, function(err, ret) {
				input$.parent().removeClass('loading-default');
			});
		}
	}
});
