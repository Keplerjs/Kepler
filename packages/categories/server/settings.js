
//add settings cats to database
Meteor.startup(function() {

	var sets = K.settings.public.categories.cats,
		cats = [];

	if(sets && sets.place && sets.user) {

		_.each(sets.place, function(active, name) {
			cats.push(_.extend({}, K.schemas.cat, {
				name: name,
				active: active,
				type: 'place'
			}));
		});

		_.each(sets.user, function(active, name) {
			cats.push(_.extend({}, K.schemas.cat, {
				name: name,
				active: active,
				type: 'user'
			}));
		});

		_.each(cats, function(cat) {

			try {
				delete cat.rank;	//Don't touch rank in database!
				var ret = Categories.upsert({	//updsate active status
					name: cat.name,
					type: cat.type
				}, {
					$set: cat
				});

			} catch(e) {
				console.warn('Cats: error loading categories from settings');
				return null;
			}
		});

		console.log('Cats: loaded categories from settings', cats.length);
	}
});
