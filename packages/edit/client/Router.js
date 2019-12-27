
Router.map(function() {

	this.route('panelPlaceEdit', {
		path: '/place/:placeId/edit',
		template: 'panelPlaceEdit',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		data: function() {
			if(!this.ready()) return null;
			
			var place = K.placeById( this.params.placeId );

			if(!place) {
				history.back();
				return null;
			}
			
			place.update();	//update instance adding new fields by placeById

			place.buildGeometry();

			$(place.icon.nodeHtml).find('.marker-place').addClass('marker-active');
			place.icon.animate();

			return place.rData();
		},
		onStop: function(e) {
			var place = K.placeById( this.params.placeId );
			if(place && place.icon)
				$(place.icon.nodeHtml).find('.marker-place').removeClass('marker-active');
		}
	});

	this.route('panelPlacesEdit', {
		path: '/places/edits',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('placesByIds', K.Profile.data.places);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('label_editplaces'),
				className: 'edits',
				headerTemplate: 'panelEdits_edit_map',
				itemsTemplate: 'item_place_edit',
				items: _.map(K.Profile.data.places, function(id) {
					return place = K.placeById(id);
				}),
				sortBy: 'createdAt',
				sortDesc: true
			};
		}
	});

	this.route('mapPlacesEdit', {
		path: '/map/edits',	//PATCH use '/' to end otherwise gen a console error
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
			K.Map.query('placesEdit');
		},
		/*onAfterAction: function() {
			if(!this.ready()) return null;
			K.Map.query('placesEdit');
		},*/
		onStop: function(e) {
			if(!this.ready()) return null;
			K.Map.query('');
		}
	});
	
});
