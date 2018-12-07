
Meteor.publish('photosByIds', function(photoIds) {
	if(this.userId && photoIds.length)
	{
		console.log('Pub: photosByIds');
		
		var photosCur = K.findPhotosByIds(photoIds),
			photosData = photosCur.fetch(),
			targetIds = _.uniq(_.flatten(_.pluck(photosData, 'targetId'))),
			targetTypes = _.uniq(_.flatten(_.pluck(photosData, 'targetType'))),
			retCurs = [photosCur];
		
		var placesIds = [];
		_.each(photosData, function(c) {
			if(c.targetType==='place')
				placesIds.push(c.targetId)
		});

		retCurs.push( K.findPlacesByIds(placesIds) );	

		return retCurs;
	}
	else
		this.ready();
});

Meteor.publish('photoById', function(photoId) {
	if(this.userId && photoId)
	{
		console.log('Pub: photoById', photoId);	

		return K.findPhotoById(photoId);
	}
	else
		this.ready();	
});

Meteor.publish('photosByTarget', function(targetId) {
	if(this.userId && targetId)
	{
		console.log('Pub: photosByTarget', targetId);

		var photosCur = K.findPhotosByTarget(targetId),
			photosData = photosCur.fetch(),
			usersIds = _.uniq( _.pluck(photosData, 'userId') );

		return [
			photosCur,
			K.findUsersByIds( _.last(usersIds,3) )
		];
	}
	else
		this.ready();	
});

Meteor.publish('photosByUser', function(userId) {
	if(this.userId && userId)
	{
		var photosCur = K.findPhotosByUser(userId),
			photosData = photosCur.fetch(),
			usersIds = _.uniq(_.pluck(photosData, 'userId'));
		
		console.log('Pub: photosByUser', userId, photosCur.count());

		return [
			//TODO add place Cur
			photosCur,
			K.findUsersByIds( _.last(usersIds, 3) )
			//TODO move this '3' in K.settings
		];
	}
	else
		this.ready();
});

Meteor.publish('photosByDate', function() {
	if(this.userId) {

		console.log('Pub: photosByDate');

		return K.findPlacesPhotosByDate();
	}
	else
		this.ready();
});
