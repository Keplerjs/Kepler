
Template.panelPlaceEdit_cats.helpers({
	allCats: function() {
		
		var placeCats = this.getCats(),
			activeCats = [];

		_.each(K.settings.public.categories.cats.place, function(v,k) {
			if(v){
				activeCats.push(k);
			}
		});

		return _.map(_.union(activeCats, placeCats), function(c) {
			return {
				val: c,
				name: c,
				active: _.contains(placeCats, c)
			};
		});
	}
});

Template.panelPlaceEdit_cats.events({
	
	'change #cats_edit input': _.debounce(function(e, tmpl) {
		e.preventDefault();

		var place = tmpl.data,
			input$ = $(e.currentTarget),
			val = input$.val();

		if(!input$.is(':checked'))
			Meteor.call('removeCatsFromPlace', place.id, val);
		else
			Meteor.call('addCatsToPlace', place.id, val);

	}, 300)
});