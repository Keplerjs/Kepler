
Meteor.publish('importsByUser', function(userId) {
	if(this.userId)
	{
		var cur = K.findPlacesImportByUser(userId);

		console.log('Pub: importsByUser', userId, cur.count());

		return cur;
	}
	else
		this.ready();
});

Meteor.publish('importsByName', function(name) {

	if(this.userId)
	{
		var cur = K.findPlacesByImportName(this.userId, name);

		console.log('Pub: importsByName', name, cur.count());

		return cur;
	}
	else
		this.ready();
});