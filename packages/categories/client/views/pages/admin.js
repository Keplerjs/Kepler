
Template.pageAdminUser_cats.onRendered(function() {

	var self = this,
		input$ = self.$('.input-cats');

	// http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/
	input$.tagsinput({
		tagClass: 'label label-primary',
		freeInput: false,
		typeaheadjs: {
			// https://github.com/twitter/typeahead.js
			hint: true,
			highlight: true,
			minLength: 1,
			limit: 30,
			//name: 'catnames',
	    	displayKey: 'name',
	    	valueKey: 'name',
			source: function(text, sync, cb) {
				
				if(!text.length) return [];

				Meteor.subscribe('catsByName', text, 'user', function() {
					
					var res = K.findCatsByName(text,'user').fetch();
					
					res = _.map(res, function(c) {
						c.text = c.name;
						return c;
					});

					cb(res);
				});
			}
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
