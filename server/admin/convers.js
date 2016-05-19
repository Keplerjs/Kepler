
K.admin.methods({
	adminDeleteAllConvers: function() {
		
		if(!K.admin.isMe()) return false;

		Convers.remove({});
		Users.update({}, {
			$set: {
				convers: []
			}
   		},{multi: true});
		Places.update({}, {
			$set: {
				convers: []
			}
   		},{multi: true});
	}	
});