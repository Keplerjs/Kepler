
Meteor.publish('importsByUserId', function(userId) {
	if(this.userId)
	{
		var cur = K.findPlacesImportByUserId(userId);

		console.log('Pub: importsByUserId', userId, cur.count());

		return cur;
	}
	else
		this.ready();
});