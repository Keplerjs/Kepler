
Template.panelSettings_cats.helpers({
	allCats: function() {
		
		var profileCats = K.Profile.data.cats,
			activeCats = [];

		_.each(K.settings.public.categories.cats.place, function(v,k) {
			if(v){
				activeCats.push(k);
			}
		});

		return _.map(_.union(activeCats, profileCats), function(c) {
			//console.log(c)
			return {
				val: c,
				name: c,//i18n('label_ors_'+p),
				active: _.contains(profileCats, c)
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