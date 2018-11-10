
Template.panelSettings_ui_lang.helpers({
	lang: function() {
		return K.settings.public.langs[K.Profile.data.lang] ? K.Profile.data.lang : K.settings.public.lang;
	},
	langs: function() {
		return _.map(K.settings.public.langs, function(v,k) {
			return {
				key: k,
				val: v,
				active: k===K.Profile.data.lang
			};
		});
	}
});

Template.panelSettings_ui_lang.events({
	'change #lang': function(e) {
		e.preventDefault();

		var lang = $(e.currentTarget).val();

		Users.update(Meteor.userId(), { $set: {'lang': lang} });

		i18n.setLanguage(lang);
	}
});