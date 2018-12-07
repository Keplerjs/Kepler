
Router.map(function() {

	this.route('convers', {
		path: '/convers',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('conversByDate');
		},
		data: function() {
			return {
				title: i18n('title_convers'),
				className: 'convers',
				itemsTemplate: 'item_conver',
				items: K.findConversByDate().fetch()
			};
		}
	});

	this.route('messages', {
		path: '/messages',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('conversByIds', K.Profile.data.convers);
		},
		data: function() {
			return {
				title: i18n('title_messages'),
				className: 'messages',
				itemsTemplate: 'item_conver',
				items: K.findConversByIds(K.Profile.data.convers).fetch(),
				sortBy: function(conv) {
					return (conv.lastMsg && conv.lastMsg.updatedAt) || conv.createdAt;
				},
				sortDesc: true
			};
		}
	});
	
	this.route('placeConvers', {
		path: '/place/:placeId/convers',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('conversByTarget', this.params.placeId);
		},
		data: function() {
			if(!this.ready()) return null;
			var place = K.placeById(this.params.placeId);
			return place && {
				title: i18n('title_placeConvers', place.name),
				className: 'placeConvers',
				headerTemplate: 'conver_place_new',
				headerData: place,		
				itemsTemplate: 'item_conver',
				items: K.findConversByTarget(this.params.placeId).fetch(),
				sortBy: 'lastMsg.updatedAt',
				sortDesc: true				
			};
		}
	});

	this.route('userConver', {
		path: '/user/:userId/conver',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);			
			if(this.params.userId===Meteor.userId())
				Router.go('convers');
			else
				K.Conver.loadConverWithUser( this.params.userId );
		}
	});

	this.route('panelConver', {
		path: '/conver/:convId',
		template: 'panelConver',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);			
			return Meteor.subscribe('converById', this.params.convId);
		},
		data: function() {
			return K.findConverById(this.params.convId).fetch()[0];
		}
	});

});