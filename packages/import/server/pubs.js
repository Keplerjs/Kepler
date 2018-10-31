
Meteor.publish('importsByUserId', function(userId) {
	if(this.userId)
	{
		console.log('Pub: importsByUserId', userId);

		return K.findPlacesImportByUserId(userId)
	}
	else
		this.ready();
});