/*
//TODO

Router.map(function() {

	this.route('panelPhotosEdit', {
		path: '/photos/edits',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('photosByIds', K.Profile.data.photos || []);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('title_photos'),
				className: 'photos',
				headerTemplate: 'panelPhotos_new',
				headerData: K.Profile.data,
				itemsTemplate: 'item_photo_edit',
				items: K.Profile.data.photos ? K.findPhotosByIds(K.Profile.data.photos).fetch() : [],
				sortBy: 'createdAt'
			};
		}
	});	
	this.route('placePhotos', {
		path: '/place/:placeId/photos',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('photosByTarget', this.params.placeId);
		},
		data: function() {
			if(!this.ready()) return null;
			var place = K.placeById(this.params.placeId);
			return place && {
				title: i18n('title_placePhotos', place.name),
				className: 'placePhotos',
				headerTemplate: 'photo_place_new',
				headerData: place,		
				itemsTemplate: 'item_conver',
				items: K.findConversByTarget(this.params.placeId).fetch(),
				sortBy: 'lastMsg.updatedAt',
				sortDesc: true				
			};
		}
	});
});
*/