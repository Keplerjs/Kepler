
if(K.Admin)
K.Admin.methods({
	cleanAllFavorites: function() {
		
		if(!K.Admin.isMe()) return null;

		Users.update(true, {$set: {favorites: []} }, { multi: true });
		Places.update(true, {$set: {rank: 0} }, { multi: true });
	}
});
