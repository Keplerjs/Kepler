
Template.pageAdminPlaces.onRendered(function() {
	var self = this;

	$(self.firstNode).find('.list-group.items-list:first').btsListFilter('.items-search', {
		itemChild: '.place-btn-name',
		loadingClass: 'loading-lg',
		sourceData: function(val, cb) {
			
			Meteor.subscribe('placesByName', val, function() {
				var items = _.map( K.findPlacesByName(val).fetch(), function(item) {
					return K.placeById(item._id);
				}); 
				cb(items);
			});
		},
		sourceNode: function(data) {
			var item$ = $('<div>');
			Blaze.renderWithData(Template.itemPlaceAdmin, data, item$[0]);
			return item$[0].firstChild;
		},
		cancelNode: function() {
			return self.$('.search-canc');
		}
	});
});

Template.itemPlaceAdmin_admin_btns.onRendered(function() {
	var self = this;
	self.$('.item-btn-del').btsConfirmButton(function(e) {
		e.stopPropagation();
		K.Admin.removePlace(self.data.id);
	});
});

