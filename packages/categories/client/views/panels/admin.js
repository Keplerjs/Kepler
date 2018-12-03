
Template.panelUserAdmin_cats.helpers({
	allCats: function() {
		
		var userCats = this.data.cats,
			activeCats = [];

		_.each(K.settings.public.categories.cats.user, function(v,k) {
			if(v) {
				activeCats.push(k);
			}
		});

		return _.map(_.union(activeCats, userCats), function(c) {
			return {
				val: c,
				name: c,
				active: _.contains(userCats, c)
			};
		});
	}
});


Template.panelUserAdmin_cats.events({
	'change #cats input': _.debounce(function(e,tmpl) {
		var userId = tmpl.data._id,
			input$ = $(e.currentTarget),
			liked = input$.is(':checked'),
			val = input$.val();

		if(!liked)
			K.Admin.call('removeCatsFromUser', userId, val);
		else
			K.Admin.call('addCatsToUser', userId, val);
	}, 300)
});