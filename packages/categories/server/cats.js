
Places.after.update(function(userId, doc, fieldNames, modifier, options) {

	if(_.contains(fieldNames,'cats') && modifier['$addToSet']) {

		var catData = {},
			cats = modifier.$addToSet.cats.$each;

		_.each(cats, function(cat) {

			catData = _.extend({}, K.schemas.cat, {
				name: cat,
				type: 'place'//user, place, all
			});

			Categories.insert(catData);
		});
	}

});
//TODO
/*Categories.before.insert(function(userId, doc) {
	doc.createdAt = K.Util.time();
});*/

Meteor.publish('catsByActive', function() {

	if(this.userId)
	{
		var cur = K.findCatsByActive();

		console.log('Pub: catsByActive', cur.count());

		return cur;
	}
	else
		this.ready();
});

Meteor.publish('catsByName', function(name, type) {

	if(this.userId)
	{
		var cur = K.findCatsByName(name, type);

		console.log('Pub: catsByName', name, cur.count());

		return cur;
	}
	else
		this.ready();
});

//add settings cats to database
Meteor.startiup(function() {

	var sets = K.settings.public.categories.cats,
		cplaces = [],
		cusers = [];

	_.each(sets.place, function(active, name) {
		return _.extend({}, K.schemas.cat, {
			name: name,
			active: active,
			type: 'place'	//user, place, all
		});
	});

	_.each(sets.user, function(active, name) {
		return _.extend({}, K.schemas.cat, {
			name: name,
			active: active,
			type: 'user'	//user, place, all
		});
	});

	return {
		place: cplaces,
		user: cusers
	};
})