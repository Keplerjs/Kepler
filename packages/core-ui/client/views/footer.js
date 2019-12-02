
Template.footer_ui_lang.helpers({
	lang: function() {
		let lang = i18n.getLanguage() || K.settings.public.lang;
		return K.settings.public.langs[lang];
	},
	langs: function() {
		let lang = i18n.getLanguage() || K.settings.public.lang,
			langs = [];
		_.each(K.settings.public.langs, function(v,k) {
			if(!!v && _.isString(v)) {
				langs.push({
					key: k,
					val: v,
					active: k===lang
				});
			}
		});
		return langs;
	}
});

Template.footer_ui_lang.events({
	'click .btn': function(e) {
		e.preventDefault();

		var lang = $(e.currentTarget).data('key');

		if(Meteor.user())
			Users.update(Meteor.userId(), { $set: {'lang': lang} });

		i18n.setLanguage(lang);
	}
});