
//https://www.jqueryscript.net/tags.php?/tags%20input/

/*Template.panelPlaceEdit_cats.onCreated(function() {
	K.Cats.loadActiveCats();
});
*/
Template.panelPlaceEdit_cats.onRendered(function() {

	var self = this,
		input$ = self.$('.input-cats');

//console.log('onRendered',input$)
//
	// http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/
	// 
	input$.tagsinput({
		tagClass: 'label label-primary',
		freeInput: false,
		typeaheadjs: {
			// https://github.com/twitter/typeahead.js
			hint: true,
			highlight: true,
			minLength: 1,
			limit: 30,
	    	displayKey: 'name',
	    	valueKey: 'name',
			source: function(text, sync, cb) {
				
				if(!text.length) return [];

				Meteor.subscribe('catsByName', text, 'place', function() {
					
					var res = K.findCatsByName(text,'place').fetch();
					
					//res = _.pluck(res,'name');
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

Template.panelPlaceEdit_cats.helpers({
	allCats: function() {

		var itemCats = this.getCats(),
			activeCats = K.Cats.getCats('place');

		return _.map(_.union(activeCats, itemCats), function(c) {
			return {
				val: c,
				name: c,
				active: _.contains(itemCats, c)
			};
		});
	}
});

Template.panelPlaceEdit_cats.events({
	'click #cats-hist .btn': _.debounce(function(e, tmpl) {
		var itemId = tmpl.data._id,
			input$ = $(e.currentTarget),
			val = input$.val();

		inputtags$ = tmpl.$('.input-cats');

		inputtags$.tagsinput('add', val);
	
	}, 300)
	/*'change #cats-edit input': _.debounce(function(e, tmpl) {
		var itemId = tmpl.data._id,
			input$ = $(e.currentTarget),
			checked = input$.is(':checked'),
			val = input$.val();

		inputtags$ = tmpl.$('.input-cats');

		var cb = function() {
			K.placeById(itemId).update();
		};

		if(!checked) {
			inputtags$.tagsinput('remove', val);

			Meteor.call('removeCatsFromPlace', itemId, val, cb);
		}
		else {
			inputtags$.tagsinput('add', val);

			Meteor.call('addCatsToPlace', itemId, val, cb);
		}
	}, 300)*/
});
