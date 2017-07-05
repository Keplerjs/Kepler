
Meteor.publish('conversByIds', function(convIds) {

	console.log('Pub: conversByIds', convIds);

	if(this.userId && convIds)
	{
		var conversCur = K.getConversByIds(convIds),
			conversData = conversCur.fetch(),
			usersIds = _.uniq(_.flatten(_.pluck(conversData, 'usersIds'))),
			targetIds = _.uniq(_.flatten(_.pluck(conversData, 'targetId'))),
			targetTypes = _.uniq(_.flatten(_.pluck(conversData, 'targetType'))),
			retCurs = [conversCur];
			
		retCurs.push( K.getUsersByIds(usersIds) );

		//TODO console.log(targetIds, targetTypes);
		//if()
		//	retCurs.push(K.getPlacesByIds( [conversData.targetId] ));

		return retCurs;
	}
	else
		this.ready();
});

Meteor.publish('converById', function(convId) {

	if(this.userId && convId)
	{
		console.log('Pub: converById', convId);

		var convCur = K.getConverById(convId),
			convData = convCur.fetch()[0];
		return [
			convCur,
			K.getMsgsByConver( convId ),
			K.getUsersByIds( convData.usersIds )
		];
	}
	else
		this.ready();	
});


Meteor.publish('conversByTarget', function(targetId) {

	console.log('Pub: conversByTarget', targetId);

	if(this.userId && targetId)
	{
		var conversCur = K.getConversByTarget(targetId),
			conversData = conversCur.fetch(),
			usersIds = _.uniq(_.flatten( _.pluck(conversData, 'usersIds') ));
			//TODO estrarre solo gli ultimi 3-4

		return [
			//TODO add place Cur
			conversCur,
			K.getUsersByIds( _.last(usersIds,3) )
		];
	}
	else
		this.ready();	
});
