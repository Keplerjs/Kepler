
Template.pageAdminUser_cats.onRendered(function() {

	var self = this,
		input$ = self.$('.input-cats');

	
	input$.tagsinput({
		// http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/
		tagClass: 'label label-primary',
		freeInput: K.settings.public.categories.freeInput,
		maxTags: K.settings.public.categories.catsMax || null,
		itemText: function(item) {
			return K.Util.sanitize.catName(item);
		},		
		typeaheadjs: {
			// https://github.com/twitter/typeahead.js
			limit: 30,
			hint: true,
			highlight: true,
			minLength: 1,
	    	displayKey: 'name',
	    	valueKey: 'name',
			source: _.debounce(function(text, sync, cb) {
				
				if(!text.length) return [];

				Meteor.subscribe('catsByName', text, 'user', function() {
					
					var res = K.findCatsByName(text,'user').fetch();
					
					res = _.map(res, function(c) {
						c.text = c.name;
						return c;
					});

					cb(res);
				});
			},300)
		}
	});

	var cb = function() {
		K.userById(self.data.id).update();
	};

	input$
	.on('itemAdded', function(e) {
		K.Admin.call('addCatsToUser', self.data.id, e.item, cb);
	})
	.on('itemRemoved', function(e) {
		K.Admin.call('removeCatsFromUser', self.data.id, e.item, cb);
	});
});
