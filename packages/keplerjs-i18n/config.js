
Meteor.startup(function() {

	i18n.setDefaultLanguage(Meteor.settings.public.langDef);

	if(Meteor.isClient)
		accountsUIBootstrap3.setLanguage(i18n.getLanguage());
});