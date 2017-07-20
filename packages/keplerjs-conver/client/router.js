
Router.map(function() {

	this.route('convers', {
		path: '/convers',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('conversByIds', K.Profile.data.convers);
		},
		data: function() {
			return {
				title: i18n('titles.convers'),
				className: 'convers',
				itemsTemplate: 'item_conver',
				items: K.findConversByIds(K.Profile.data.convers).fetch(),
				sortDesc: true
			};
		}
	});
	
	this.route('placeConvers', {
		path: '/place/:placeId/convers',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('conversByTarget', this.params.placeId);
		},
		data: function() {
			if(!this.ready()) return null;
			var place = K.placeById(this.params.placeId);
			return place && {
				title: i18n('titles.placeConvers', place.name),
				className: 'placeConvers',
				headerTemplate: 'conver_place_new',
				headerData: place,		
				itemsTemplate: 'item_conver',
				items: K.findConversByTarget(this.params.placeId).fetch()
			};
		}
	});

	this.route('userConver', {
		path: '/user/:userId/conver',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			if(this.params.userId===Meteor.userId())
				Router.go('convers');
			else
				K.Conver.loadConverWithUser( this.params.userId );
		}
	});

	this.route('panelConver', {
		path: '/conver/:convId',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('converById', this.params.convId);
		},
		data: function() {
			return K.findConverById(this.params.convId).fetch()[0];
		}
	});

});