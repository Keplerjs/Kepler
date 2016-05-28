
Meteor.publish('conversByIds', function(convIds) {

	console.log('Pub: conversByIds', convIds);

	if(this.userId && convIds)
	{
		var conversCur = getConversByIds(convIds),
			conversData = conversCur.fetch(),
			usersIds = _.uniq(_.flatten(_.pluck(conversData, 'usersIds')));
			//TODO estrarre solo gli ultimi 3-4

console.log('conversByIds', usersIds, _.pluck(getUsersByIds( usersIds ).fetch(),'name') )

		return [
			conversCur,
			getPlacesByIds( [conversData.placeId] ),
			getUsersByIds( usersIds )
		];
	}
	else
		this.ready();
});

Meteor.publish('converById', function(convId) {

	if(this.userId && convId)
	{
		console.log('Pub: converById', convId);

		var convCur = getConverById(convId),
			convData = convCur.fetch()[0];
		return [
			convCur,
			getMsgsByConver( convId ),
			getUsersByIds( convData.usersIds )
		];
	}
	else
		this.ready();	
});


Meteor.publish('conversByPlace', function(placeId) {

	console.log('Pub: conversByPlace', placeId);

	if(this.userId && placeId)
	{
		var conversCur = getConversByPlace(placeId),
			conversData = conversCur.fetch(),
			usersIds = _.uniq(_.flatten( _.pluck(conversData, 'usersIds') ));
			//TODO estrarre solo gli ultimi 3-4

		return [
			//TODO add place Cur
			conversCur,
			getUsersByIds( _.last(usersIds,3) )
		];
	}
	else
		this.ready();	
});
