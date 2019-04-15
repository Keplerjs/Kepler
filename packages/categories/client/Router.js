Router.map(function() {

	this.route('placesCats', {
		path: '/places/cat/:cat',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('placesByCategory', this.params.cat);
		},
		data: function() {
			if(!this.ready()) return null;
			
			var places = K.findPlacesByCategory(this.params.cat).fetch();

			return {
				title: i18n('title_cats_places', this.params.cat),
				className: 'placesCats',
				//headerTemplate: 'search_cats',
				itemsTemplate: 'itemPlaceCats',
				items: _.map(places, function(place) {
					return K.placeById(place._id);
				})
			};
		}
	});

	this.route('usersCats', {
		path: '/users/cat/:cat',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('usersByCategory', this.params.cat);
		},
		data: function() {
			if(!this.ready()) return null;
			
			var users = K.findUsersByCategory(this.params.cat).fetch();

			return {
				title: i18n('title_cats_users', this.params.cat),
				className: 'usersCats',
				//headerTemplate: 'search_cats',
				itemsTemplate: 'item_user_search',
				items: _.map(users, function(user) {
					return K.userById(user._id);
				})
			};
		}
	});

	this.route('panelCats', {
		path: '/categories',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function () {
			if(!K.Admin || !K.Admin.isMe())
				Router.go('root');
			else
				this.next();
		},
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('catsByName');
		},
		data: function() {
			if(!this.ready()) return null;
			return  {
				title: i18n('title_panelCatsType'),
				className: 'cats',
				headerTemplate: 'formSearchCats',
				itemsTemplate: 'itemCat',
				items: K.findCatsByName('').fetch()
			};
		}
	});

	this.route('panelCatsType', {
		path: '/categories/:type',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function () {
			if(!K.Admin || !K.Admin.isMe())
				Router.go('root');
			else
				this.next();
		},
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('catsByType', this.params.type);
		},
		data: function() {
			if(!this.ready()) return null;
			return  {
				title: i18n('title_panelCatsType'),
				className: 'cats',
				headerTemplate: 'formSearchCats',
				headerData: {
					typeCat: this.params.type
				},
				itemsTemplate: 'itemCat',
				items: K.findCatsByType(this.params.type).fetch()
			};
		}
	});	
});
