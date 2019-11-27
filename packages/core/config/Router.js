
//TODO use https://github.com/DerMambo/ms-seo

if(Meteor.isClient && Router) {
	
	Router.configure({
		loadingTemplate: 'panelLoading',
		notFoundTemplate: 'page404',
		//https://github.com/reywood/meteor-iron-router-ga
		trackPageView: true,
		//https://github.com/VeliovGroup/Meteor-iron-router-meta
		meta: K.settings.public.router.meta,
		link: K.settings.public.router.link
	});

	Router.waitOn(function() {

		var routeName = this.route.getName();

		if(!Meteor.user()) {
			if(Meteor.loggingIn())
				this.render(this.loadingTemplate);
			else {
				//is not a public route go to login box
				if(!K.settings.public.router.publicRoutes[routeName])
					Router.go(K.settings.public.router.loginRoute);
			}
		}
		else {
			return Meteor.subscribe('currentUser', function() {

				K.Profile.init(function(data) {
					
					i18n.setLanguage(data.lang);

					//TODO move to plugin admin
					if(K.Admin && K.Admin.isMe()){
						K.Admin.loadMethods();
					}
				});
			});
		}
		
	});

	Router.onAfterAction(function() {

		var routeName = this.route.getName();

		document.title = i18n('title_'+routeName) || _.str.capitalize(routeName);
		//TODO replace with https://github.com/VeliovGroup/Meteor-iron-router-title

		if(this.ready() && K.Profile.ready) {

			if(this.route.options.layoutTemplate==='layoutMap') {
				/*
				Template.layoutMap.onRendered(function() {
					K.Map.init($('#map')[0], K.Profile.getOpts('map'));
				});
				Template.layoutMap.onDestroyed(function() {
					K.Map.destroy();
				});
				*/
				//PATCH render map after template layoutMap is rendered
				//Template.layoutMap.onRendered(function() {

				Meteor.setTimeout(function() {
					
					K.Map.init($('#map')[0], K.Profile.getOpts('map'));

				},10);
			
			}
			else 
				K.Map.destroy();
		}
	});
}