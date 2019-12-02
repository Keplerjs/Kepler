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
				headerTemplate: 'btnCats_place',
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
				headerTemplate: 'btnCats_user',
				itemsTemplate: 'item_user_search',
				items: _.map(users, function(user) {
					return K.userById(user._id);
				})
			};
		}
	});

	this.route('panelAdminCats', {
		path: '/admin/categories',
		onBeforeAction: function () {
			this.redirect('/admin/categories/place');
		}
	});

	this.route('panelAdminCatsType', {
		path: '/admin/categories/:type',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function () {
			if(!K.Admin || !K.Admin.isMe())
				history.back();
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
				itemsTemplate: 'itemAdminCat',
				items: K.findCatsByType(this.params.type).fetch()
			};
		}
	});

	this.route('panelCats', {
		path: '/categories',
		onBeforeAction: function () {
			this.redirect('/categories/place');
		}
	});

	this.route('panelCatsType', {
		path: '/categories/:type',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('catsByType', this.params.type);
		},
		data: function() {
			if(!this.ready()) return null;
			return  {
				title: i18n('label_cats'),
				className: 'allcats',
				headerTemplate: 'panelCats',
				headerData: {
					typeCat: this.params.type
				},
				grid: true,
				itemsTemplate: 'itemCat',
				items: K.findCatsByType(this.params.type).fetch()
			};
		}
	});
});
