
//add settings cats to database
Meteor.startup(function() {

	var sets = K.settings.public.categories.cats,
		cats = [];

	//TODO Cate
	console.log('Cats: load categories from settings...');

	_.each(sets.place, function(active, name) {
		if(active) {
			cats.push(_.extend({}, K.schemas.cat, {
				name: name,
				active: active,
				type: 'place'
			}));
		}
	});

	_.each(sets.user, function(active, name) {
		if(active) {
			cats.push(_.extend({}, K.schemas.cat, {
				name: name,
				active: active,
				type: 'user'
			}));
		}
	});

	_.each(cats, function(cat) {

		try {
			var ret = Categories.upsert({
				name: cat.name,
				type: cat.type
			}, {
				$set: cat
			});

		} catch(e) {
			//throw new Meteor.Error(500, i18n('error_cats_exists',name) );
			console.log( i18n('error_cats_exists',cat.name), 'type', cat.type );
			return null;
		}
	});
});