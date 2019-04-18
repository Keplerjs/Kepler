
//TODO //doc.createdAt = K.Util.time();
Categories.after.remove(function(userId, doc) {

	var type = doc.type,
		cat = doc.name;

	if(type==='user') {
		Users.update({cats: cat}, {
			$pull: {cats: cat, catshist: cat }
		});
	}
	else if(type==='place') {
		Places.update({cats: cat}, {
			$pull: {cats: cat }
		});
	}

	Users.update({catshist: cat}, {
		$pull: {catshist: cat }
	});
});

Meteor.publish('catsActive', function() {

	if(this.userId)
	{
		var cur = K.findCatsActive();

		//console.log('Pub: catsActive' );

		return cur;
	}
	else
		this.ready();
});

Meteor.publish('catsByName', function(name, type) {

	if(this.userId)
	{
		var cur = K.findCatsByName(name, type);

		console.log('Pub: catsByName', name);

		return cur;
	}
	else
		this.ready();
});

Meteor.publish('catsByType', function(type) {

	if(this.userId)
	{
		var cur = K.findCatsByType(type);

		console.log('Pub: catsByType', type);

		return cur;
	}
	else
		this.ready();
});

