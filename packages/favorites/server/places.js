
Places.after.remove(function(userId, doc) {

	Users.update({
		favorites: doc._id
	},{
		$pull: {
			favorites: doc._id
		}
	});
});
