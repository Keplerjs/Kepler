
Meteor.publish('catsActive', function() {

	if(this.userId|| K.settings.public.router.publicRoutes.panelCatsType)
	{
		var cur = K.findCatsActive();

		//console.log('Pub: catsActive' );

		return cur;
	}
	else
		this.ready();
});

Meteor.publish('catsByName', function(name, type) {

	if(this.userId || K.settings.public.router.publicRoutes.panelCatsName)
	{
		var cur = K.findCatsByName(name, type);

		console.log('Pub: catsByName', name);

		return cur;
	}
	else
		this.ready();
});

Meteor.publish('catsByType', function(type) {

	if(this.userId || K.settings.public.router.publicRoutes.panelCatsType)
	{
		var cur = K.findCatsByType(type);

		console.log('Pub: catsByType', type);

		return cur;
	}
	else
		this.ready();
});

