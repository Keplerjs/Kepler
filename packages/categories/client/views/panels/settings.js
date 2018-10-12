
Template.panelSettings_cats.helpers({
	placeCats: function() {
		return _.map(K.Cats.actives, function(k) {
			return {
				val: k,
				name: i18n('cats.place.'+k),
				active: _.contains(K.Profile.data.cats, k)
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