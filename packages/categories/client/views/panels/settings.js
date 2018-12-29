
/*Template.panelSettings_cats.onCreated(function() {
	K.Cats.loadActiveCats();
});
*/
Template.panelSettings_cats.helpers({
	allCats: function() {
		
		var userCats = K.Profile.data.cats,
			activeCats = K.Cats.getCats('user');

		return _.map(_.union(activeCats, userCats), function(c) {
			return {
				val: c,
				name: c,
				active: _.contains(userCats, c)
			};
		});
	}
});

Template.panelSettings_cats.events({
	'change #cats input': _.debounce(function(e) {
		var val = $(e.currentTarget).val(),
			liked = $(e.currentTarget).is(':checked');

		if(!liked)
			Users.update(Meteor.userId(), { $pull: {'cats': val } });
		else
			Users.update(Meteor.userId(), { $addToSet: {'cats': val } });
	}, 300)
});