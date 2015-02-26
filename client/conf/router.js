
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'pageLoading'
});

Router.onBeforeAction(function(){

	if(!(Meteor.loggingIn() || Meteor.user()))
		Router.go('pageIntro');

	this.next();

}, {except: ['pageIntro', 'forgotPassword', 'resetPassword', 'verifyEmail']});

Router.map(function() {

	this.route('pageMap', {
		path: '/',
		template: 'pageMap',
		onBeforeAction: function() {
			this.next();
		}
		,action: function () {

			console.log('render pageMap');

			if(this.ready())
				this.render();
			else
				this.render('pageLoading');
		}
	});

    this.route('pageIntro', {
		path: '/intro'
	});

	this.route('pageNotifs', {
		path: '/notifications',
		template: 'pageList',
		waitOn: function() {
			return Climbo.profile.loadNotifs();
		},
		data: function() {
			return {
				className: 'pageNotifs',
				itemsTemplate: 'item_notif',
				items: Climbo.profile.notifs
			};
		}
	});
	
	this.route('pageFavorites', {
		path: '/favorites',
		template: 'pageList',
		waitOn: function() {
			return Climbo.profile.loadFavorites();
		},
		data: function() {
			return {
				className: 'pageFavorites',
				itemsTemplate: 'item_favorite',
				items: Climbo.profile.favorites,
				sortDesc: true,
				sortBy: 'name'
			};
		}
	});
	
	this.route('pageConvers', {
		path: '/convers',
		template: 'pageList',
		waitOn: function() {
			return Meteor.subscribe('conversByIds', Climbo.profile.data.convers);
		},
		data: function() {
			return {
				className: 'pageConvers',
				itemsTemplate: 'itemConver',
				items: getConversByIds(Climbo.profile.data.convers).fetch(),
				sortDesc: true
			};
		}
	});
	
	this.route('pageConver', {
		path: '/convers/:convId',
		template: 'pageConver',
		waitOn: function() {
			return Meteor.subscribe('converById', this.params.convId);
		},
		data: function() {
			var convData = getConverById(this.params.convId).fetch()[0];
/*
var convData = getConverById(convId).fetch()[0],
title = convData.title || Climbo.i18n.ui.titles.msgpriv,
place = Climbo.newPlace(convData.placeId),
placeName = convData.placeId ? _.str.capitalize(place.name)+': ' : '',
usersItems = _.map(convData.usersIds, Climbo.newUser);
title$.html('<i class="icon icon-mes"></i> '+ placeName + title  );
*/
			convData.title = convData.title || Climbo.i18n.ui.titles.pageConver;
			convData.usersItems = _.map(convData.usersIds, Climbo.newUser);

			return convData;
		}
	});

	this.route('pagePlaceConvers', {
		path: '/place/:placeId/convers',
		template: 'pageList',
		waitOn: function() {
			return Meteor.subscribe('conversByPlace', this.params.placeId);
		},
		data: function() {
			return {
				//title: '<i class="icon icon-mes"></i> '+_.template(Climbo.i18n.ui.titles.pagePlaceConvers, self),
				className: 'pagePlaceConvers',
				header: {
					template: 'itemConverNew',
					data: {placeId: this.params.placeId}
				},
				itemsTemplate: 'itemConver',
				items: getConversByPlace(this.params.placeId).fetch(),
				sortDesc: true
			};
		}
	});

	this.route('pageSettings', {
		path: '/settings'
	});

	this.route('logout', {
		path: '/logout',
		onBeforeAction: function () {

			Climbo.profile.logout();
			
			Router.go('pageIntro');
		}
	});
});
