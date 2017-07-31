
Meteor.startup(function() {

	i18n.setDefaultLanguage(K.settings.public.lang);

	if(Meteor.isClient)
		accountsUIBootstrap3.setLanguage(i18n.getLanguage());
});