
Meteor.publish('conversByIds', function(convIds) {

	console.log('Pub: conversByIds');

	if(this.userId && convIds)
	{
		var conversCur = K.findConversByIds(convIds),
			conversData = conversCur.fetch(),
			usersIds = _.uniq(_.flatten(_.pluck(conversData, 'usersIds'))),
			targetIds = _.uniq(_.flatten(_.pluck(conversData, 'targetId'))),
			targetTypes = _.uniq(_.flatten(_.pluck(conversData, 'targetType'))),
			retCurs = [conversCur];
		
		var placesIds = [];
		_.each(conversData, function(c) {
			if(c.targetType==='place')
				placesIds.push(c.targetId)
		});

		retCurs.push( K.findPlacesByIds(placesIds) );	
		retCurs.push( K.findUsersByIds(usersIds) );

		return retCurs;
	}
	else
		this.ready();
});

Meteor.publish('converById', function(convId) {

	if(this.userId && convId)
	{
		console.log('Pub: converById', convData);	

		var convCur = K.findConverById(convId),
			convData = convCur.fetch()[0],
			usersIds = convData && convData.usersIds;
		//TODO K.findPlacesByIds(placesIds)
		return [
			convCur,
			K.findMsgsByConver(convId),
			K.findUsersByIds(usersIds)
		];
	}
	else
		this.ready();	
});


Meteor.publish('conversByTarget', function(targetId) {

	console.log('Pub: conversByTarget', targetId);

	if(this.userId && targetId)
	{
		var conversCur = K.findConversByTarget(targetId),
			conversData = conversCur.fetch(),
			usersIds = _.uniq(_.flatten( _.pluck(conversData, 'usersIds') ));
			//TODO estrarre solo gli ultimi 3-4

		return [
			//TODO add place Cur
			conversCur,
			K.findUsersByIds( _.last(usersIds,3) )
		];
	}
	else
		this.ready();	
});


Meteor.publish('conversPlaces', function() {
	if(this.userId) {
		console.log('Pub: conversPlaces');

		var conversCur = K.findConversPlaces(),
			conversData = conversCur.fetch(),
			usersIds = _.uniq(_.flatten(_.pluck(conversData, 'usersIds'))),
			//targetIds = _.uniq(_.flatten(_.pluck(conversData, 'targetId'))),
			//targetTypes = _.uniq(_.flatten(_.pluck(conversData, 'targetType'))),
			retCurs = [conversCur];

		var placesIds = [];
		_.each(conversData, function(c) {
			if(c.targetType==='place')
				placesIds.push(c.targetId)
		});

		retCurs.push( K.findPlacesByIds(placesIds) );
		retCurs.push( K.findUsersByIds(usersIds) );
		
		return retCurs;
	}
	else
		this.ready();
});
