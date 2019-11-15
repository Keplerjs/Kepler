
Template.panelPlaceEdit_cats_input.onRendered(function() {

	var self = this,
		inputtags$ = self.$('.input-cats');
	
	inputtags$.tagsinput({
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

				Meteor.subscribe('catsByName', text, 'place', function() {
					
					var res = K.findCatsByName(text,'place').fetch();
					
					res = _.map(res, function(c) {
						c.text = c.name;
						return c;
					});

					cb(res);
				});
			}, 300)
		}
	});

	var cb = function() {
		K.placeById(self.data.id).update();
	};

	inputtags$
	.on('itemAdded', function(e) {
		Meteor.call('addCatsToPlace', self.data.id, e.item, cb);
	})
	.on('itemRemoved', function(e) {
		Meteor.call('removeCatsFromPlace', self.data.id, e.item, cb);
	});
});

Template.panelPlaceEdit_cats_latest.helpers({
	cats: function() {
		var hist = _.difference(K.Profile.data.catshist, this.getCats());
		return _.first(hist.reverse(), K.settings.public.categories.catsHistLength);
	}
});

Template.panelPlaceEdit_cats_latest.events({
	'click .pick-cats-latest .btn': _.debounce(function(e, tmpl) {
		var itemId = tmpl.data._id,
			btn$ = $(e.currentTarget),
			panel$ = $(tmpl.firstNode).parents('.panel-body');

		inputtags$ = panel$.find('.input-cats');

		inputtags$.tagsinput('add', btn$.val() );
	
	}, 300)
});

Template.panelPlaceEdit_cats_all.onCreated(function() {

	var self = this;

	self.allcats = new ReactiveVar([]);

	Meteor.subscribe('catsByType','place', function() {
		var cats = K.findCatsByType('place').fetch();
		cats = _.sortBy(_.pluck(cats,'name'), function(c) {
			return c.toLowerCase();
		});
		self.allcats.set(cats)
	});
});

Template.panelPlaceEdit_cats_all.helpers({
	cats: function() {
		var tmpl = Template.instance();

		return tmpl.allcats.get();
	}
});

Template.panelPlaceEdit_cats_all.events({
	'click .pick-cats-all .btn': _.debounce(function(e, tmpl) {
		var itemId = tmpl.data._id,
			btn$ = $(e.currentTarget),
			panel$ = $(tmpl.firstNode).parents('.panel-body');

		inputtags$ = panel$.find('.input-cats');

		inputtags$.tagsinput('add', btn$.val() );
	
	}, 300)
});
