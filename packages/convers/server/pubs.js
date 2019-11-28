
Meteor.publish('conversByIds', function(convIds) {
	if(this.userId && convIds)
	{
		console.log('Pub: conversByIds');

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
	if(convId && this.userId || K.settings.public.router.publicRoutes.panelConver)
	{
		console.log('Pub: converById', convId);	

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
	if(targetId && this.userId || K.settings.public.router.publicRoutes.placeConvers)
	{
		console.log('Pub: conversByTarget', targetId);

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

Meteor.publish('conversByUser', function(userId) {
	if(this.userId && userId)
	{
		var conversCur = K.findConversByUser(userId),
			conversData = conversCur.fetch(),
			usersIds = _.uniq(_.flatten( _.pluck(conversData, 'usersIds') ));
			//TODO estrarre solo gli ultimi 3-4
		
		console.log('Pub: conversByUser', userId, conversCur.count());

		return [
			//TODO add place Cur
			conversCur,
			K.findUsersByIds( _.last(usersIds, 3) )
			//TODO move this '3' in K.settings
		];
	}
	else
		this.ready();
});

Meteor.publish('conversByDate', function() {
	if(this.userId || K.settings.public.router.publicRoutes.convers) {

		console.log('Pub: conversByDate');

		var conversCur = K.findConversByDate(),
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
