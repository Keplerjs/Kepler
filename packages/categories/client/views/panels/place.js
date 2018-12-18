
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

		console.log('allCats', ret);

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