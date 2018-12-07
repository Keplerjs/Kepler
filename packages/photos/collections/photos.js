
Photos = new Mongo.Collection('photos');

K.Photos = Photos;

Photos.allow({
	insert: function(userId, doc) {
		return true;
	},
	update: function(userId, doc) {
		//TODO maybe return userId && doc.userId === userId;
		return true;
	},
	remove: function(userId, doc) {
		return userId && doc.userId === userId;
	}
});

//TODO
Photos.before.insert(function(userId, doc) {
	doc.createdAt = K.Util.time();
});

K.extend({
	findPhotoById: function(photoId) {
		//TODO ritornare solo ultimi 10 messaggi!!
		//TODO scaricare messaggi un po alla volta
		return Photos.find(photoId, K.filters.photoPanel);
	},
	findPhotosByIds: function(photoIds) {
		
		photoIds = _.isArray(photoIds) ? {$in: photoIds} : photoIds;

		return Photos.find({_id: photoIds }, K.filters.photoItem);
	},
	findPhotosByUser: function(userId) {
		return Photos.find({userId: userId, targetType:'place' }, K.filters.photoItem);
	},
	findPhotosByTarget: function(targetId) {
		return Photos.find({targetId: targetId }, K.filters.photoItem);
	},

	findPlacesPhotosByDate: function() {
		return Places.find({
			photo: {
				$exists: true,
				$ne: ''
			}
		}, _.deepExtend({}, K.filters.placeItem, {
				sort: {
					'createdAt': -1
				},
				limit: 50
			})
		);
	},	
	/* TODO copid by convers plugin findPhotosByUser: function(userId) {
		//TODO maybe return photos to partecipate to
		//return Photos.find({userId: userId, targetType:'place' }, K.filters.photoItem);
		return Photos.find({usersIds: userId, targetType:'place' }, K.filters.photoItem);
	},*/
});	