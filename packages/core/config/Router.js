
//TODO use https://github.com/DerMambo/ms-seo

if(Router && Meteor.isClient) {
	
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

		var self = this;
		
		var routeName = this.route.getName();

		//PATCH do display logins button after logout
		Accounts._loginButtonsSession.set('dropdownVisible', true);
		Accounts._loginButtonsSession.set('inChangePasswordFlow',true)

		if(!Meteor.user()) {
			if(Meteor.loggingIn()) {
				self.render(self.loadingTemplate);
			}
			else {
				//is not a public route go to login box
				if(!K.settings.public.router.publicRoutes[routeName])
					Router.go(K.settings.public.router.loginRoute);
				else {
					//not logged users
				}
			}
		}
		else {
			return Meteor.subscribe('currentUser', function() {

				self.render(self.loadingTemplate);

				K.Profile.init(function(data) {
					
					i18n.setLanguage(data.lang);
					
					//console.log('profile init');
					if(K.Map.ready())
						K.Map.setOpts( K.Profile.getOpts('map') );
				});
			});
		}	
	});

	Router.onAfterAction(function() {

		var routeName = this.route.getName(),
			mapSets = K.settings.public.map;

		document.title = i18n('title_'+routeName) || _.str.capitalize(routeName);
		//TODO replace with https://github.com/VeliovGroup/Meteor-iron-router-title

		if(this.ready()) {//} && K.Profile.ready) {

			if(this.route.options.layoutTemplate==='layoutMap') {
		
				
				Meteor.setTimeout(function() {

					if(K.Profile.ready)
						mapSets = K.Profile.getOpts('map');
					
					K.Map.init($('#map')[0], mapSets);
				
				},300);
			
			}
			else 
				K.Map.destroy();
		}
	});
}