/*
	THIS TEMPLATE IS WORK IN PROGRESS
*/
Template.panelSearch.onRendered(function() {
	
	this.$('.list-items').btsListFilter('.input-search', {
		itemChild: '.item-name',
		loadingClass: 'loading-lg',
		sourceData: function(val, callback) {
			
			Meteor.subscribe('usersByName', val, function() {
				
				var users = _.map( K.findUsersByName(val).fetch(), function(user) {
					return K.userById(user._id);
				});

				callback(users);
			});
		},
		sourceNode: function(data) {
			var item$ = $('<li class="list-group-item"></li>');
			Blaze.renderWithData(Template[data.template], data, item$[0]);
			return item$;
		}
	});
});
