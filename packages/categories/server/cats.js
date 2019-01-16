
//TODO //doc.createdAt = K.Util.time();
Categories.after.remove(function(userId, doc) {

	var type = doc.type,
		cat = doc.name;

	if(type==='user') {
		Users.update({cats: cat}, {
			$pull: {cats: cat }
		});
	}
	else if(type==='place') {
		Places.update({cats: cat}, {
			$pull: {cats: cat }
		});
	}
});

Meteor.publish('catsActive', function() {

	if(this.userId)
	{
		var cur = K.findCatsActive();

		console.log('Pub: catsActive', cur.count() );

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

