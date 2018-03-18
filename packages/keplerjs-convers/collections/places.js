
Places.after.remove(function(userId, doc) {

	Convers.remove({
		targetId: doc._id,
		targetType:'place'
	});
});
