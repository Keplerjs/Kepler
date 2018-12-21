
Template.panelPlaceEdit_cats.onRendered(function() {
	var self = this,
		input$ = self.$('.input-cats');
		var cats = ["bus", "car", "castle", "house", "panchina", "parco", "parking", "piazza"];
//https://www.jqueryscript.net/tags.php?/tags%20input/
//http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/
//TODO .tagsinput('destroy');
	input$.tagsinput({
		tagClass: 'label label-primary',
		freeInput: false,
		typeaheadjs: {
			//name: 'catnames',
	    	displayKey: 'name',
	    	valueKey: '_id',
			source: function(text, sync, async) {
				console.log(arguments)
				
				Meteor.subscribe('catsByName', text, 'place', function() {
					
					var res = K.findCatsByName(text,'place').fetch();
					
					//res = _.pluck(res,'name');

					console.log('res',res)
					//async([])
					sync(res)
				});
				//return K.findCatsByName('ca').fetch()
				//
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
		
		var placeCats = this.getCats(),
			activeCats = K.Cats.activeCats.place;

		var ret = _.map(_.union(activeCats, placeCats), function(c) {
			return {
				val: c,
				name: c,
				active: _.contains(placeCats, c)
			};
		});

		//console.log('allCats', ret);

		return ret;
	}
});

Template.panelPlaceEdit_cats.events({
	'change #cats-edit input': _.debounce(function(e, tmpl) {
		var itemId = tmpl.data._id,
			input$ = $(e.currentTarget),
			checked = input$.is(':checked'),
			val = input$.val();

		var cb = function() {
			K.placeById(itemId).update();
		};

		if(!checked)
			Meteor.call('removeCatsFromPlace', itemId, val, cb);
		else
			Meteor.call('addCatsToPlace', itemId, val, cb);
	}, 300)
});
