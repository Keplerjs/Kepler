
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

	_.each(cats, function(cat){
		var ret = Categories.upsert({
			name: cat.name,
			type: cat.type
		}, {
			$set: cat
		});
	});
});