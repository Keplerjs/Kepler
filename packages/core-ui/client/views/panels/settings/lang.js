
Template.panelSettings_ui_lang.helpers({
	lang: function() {
		return K.settings.public.langs[K.Profile.data.lang] ? K.Profile.data.lang : K.settings.public.lang;
	},
	langs: function() {
		var langs = [];
		_.each(K.settings.public.langs, function(v,k) {
			if(!!v && _.isString(v)) {
				langs.push({
					key: k,
					val: v,
					active: k===K.Profile.data.lang
				});
			}
		});
		return langs;
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