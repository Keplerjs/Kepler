
Meteor.publish('conversByIds', function(convIds) {

	console.log('Pub: conversByIds', convIds);

	if(this.userId && convIds)
	{
		var conversCur = getConversByIds(convIds),
			conversData = conversCur.fetch(),
			usersIds = _.uniq(_.flatten(_.pluck(conversData, 'usersIds'))),
			targetIds = _.uniq(_.flatten(_.pluck(conversData, 'targetId'))),
			targetTypes = _.uniq(_.flatten(_.pluck(conversData, 'targetType'))),
			retCurs = [conversCur];
			
		retCurs.push(getUsersByIds(usersIds));

console.log(targetIds, targetTypes)
		//if()
		//	retCurs.push(getPlacesByIds( [conversData.targetId] ));

		return retCurs;
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


Meteor.publish('conversByTarget', function(targetId) {

	console.log('Pub: conversByTarget', targetId);

	if(this.userId && targetId)
	{
		var conversCur = getConversByTarget(targetId),
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
