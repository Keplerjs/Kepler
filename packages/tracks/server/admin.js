
if(K.Admin)
K.Admin.methods({
	removeAllTracks: function() {
		
		if(!K.Admin.isMe()) return false;

		Tracks.remove({});
	}	
});