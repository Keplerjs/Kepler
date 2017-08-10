
if(K.Admin)
K.Admin.methods({
	cleanAllFavorites: function() {
		
		if(!K.Admin.isMe()) return null;

		Users.update({}, {
			$set: {
				favorites: []
			}
		}, { multi: true });

		Places.update({}, {
			$set: {
				rank: 0
			}
		}, { multi: true });
	}
});
