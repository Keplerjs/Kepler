

//http://avatars.io/

Template.pageSettings.helpers({
	types: function() {
		return _.map(Climbo.i18n.ui.places, function(v, type) {
			return {type: type, name: v, liked: _.contains(Climbo.profile.data.likeplaces, type) };
		});
	},
	email: function() {
		if(Climbo.profile.data.emails)
			return Climbo.profile.data.emails[0];
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

	'keyup #email': _.debounce(function(e) {
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
	}, Meteor.settings.public.typeDelay),

	'keyup #city': _.debounce(function(e) {
		Meteor.users.update(Meteor.userId(), { $set:{city: e.target.value} });
	}, Meteor.settings.public.typeDelay),

	'click #likeplaces a': _.debounce(function(e) {
		e.preventDefault();
		var typePlace = $(e.originalEvent.target).data('type');

		console.log(e.originalEvent.target)

		if(_.contains(Climbo.profile.data.likeplaces, typePlace))
			Meteor.users.update(Meteor.userId(), { $pull:{likeplaces: typePlace} });
		else
			Meteor.users.update(Meteor.userId(), { $addToSet:{likeplaces: typePlace} });

	}, Meteor.settings.public.typeDelay),

	'change #fileavatar': function(e) {
		e.preventDefault();

		var input$ = $(e.target),
			file = e.originalEvent.target.files[0];
		
		input$.next().text('');

		if(!Climbo.util.valid.image(file))
			input$.next().text(
				Climbo.i18n.errors.imageNotValid +
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
