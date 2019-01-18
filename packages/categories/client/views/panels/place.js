
Template.panelPlaceEdit_cats.onRendered(function() {

	var self = this,
		input$ = self.$('.input-cats');
	
	input$.tagsinput({
		// http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/ 
		tagClass: 'label label-primary',
		freeInput: false,
		maxTags: K.settings.public.categories.catsMax || null,
		typeaheadjs: {
			// https://github.com/twitter/typeahead.js
			limit: 30,
			hint: true,
			highlight: true,
			minLength: 1,
	    	displayKey: 'name',
	    	valueKey: 'name',
			source: function(text, sync, cb) {
				
				if(!text.length) return [];

				Meteor.subscribe('catsByName', text, 'place', function() {
					
					var res = K.findCatsByName(text,'place').fetch();
					
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
		K.placeById(self.data.id).update();
	};

	input$
	.on('itemAdded', function(e) {
		Meteor.call('addCatsToPlace', self.data.id, e.item, cb);
	})
	.on('itemRemoved', function(e) {
		Meteor.call('removeCatsFromPlace', self.data.id, e.item, cb);
	});
});

Template.panelPlaceEdit_cats.events({
	'click #cats-hist .btn': _.debounce(function(e, tmpl) {
		var itemId = tmpl.data._id,
			input$ = $(e.currentTarget),
			val = input$.val();

		inputtags$ = tmpl.$('.input-cats');

		inputtags$.tagsinput('add', val);
	
	}, 300)
});
