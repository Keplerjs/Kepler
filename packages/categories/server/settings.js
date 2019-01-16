
//add settings cats to database
Meteor.startup(function() {

	var sets = K.settings.public.categories.cats,
		cats = [];

	_.each(sets.place, function(active, name) {	
		cats.push(_.extend({}, K.schemas.cat, {
			name: name,
			active: active,
			type: 'place'	//user, place, all
		}));
	});

	_.each(sets.user, function(active, name) {	
		cats.push(_.extend({}, K.schemas.cat, {
			name: name,
			active: active,
			type: 'user'	//user, place, all
		}));
	});

	var cc = 0;
	_.each(cats, function(cat){
		var ret = Categories.upsert({
			name: cat.name,
			type: cat.type
		}, {
			$set: cat
		});
		cc += ret.numberAffected;
	});
	//TODO Cate
	console.log('Cats: update categories from settings', cc);

});