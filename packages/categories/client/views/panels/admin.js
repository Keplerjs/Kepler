
Template.formSearchCats.onRendered(function() {
	var self = this,
		typeCat = Router.current().params.type;

	$(self.firstNode).parent().siblings('.list-items').btsListFilter('.cats-search', {
		itemChild: '.label',
		loadingClass: 'loading-lg',
		sourceData: function(val, callback) {

			Meteor.subscribe('catsByName', val, typeCat, function() {
				
				var cats = K.findCatsByName(val, typeCat).fetch();

				callback(cats);
			});
		},
		sourceNode: function(data) {
			var item$ = $('<li class="list-group-item"></li>');
			Blaze.renderWithData(Template.itemCat, data, item$[0]);
			return item$;
		},
		cancelNode: function() {
			return self.$('.search-canc');
		}
	});

	self.$('#switch_online').bootstrapSwitch({
		size: 'mini',
		onColor: 'success',		
		state: K.Profile.getOnline(),
		onSwitchChange: function (e, stat) {
			K.Profile.setOnline(stat);
		}
	});
});


Template.itemCat.onRendered(function() {
	
	var self = this;

	self.$('.btn-catdel').btsConfirmButton(function(e) {

		Meteor.call('removeCat', self.data.name);
	});
});
