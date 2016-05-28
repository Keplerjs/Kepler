
K.admin.methods({
	delAllConvers: function() {
		
		if(!K.admin.isMe()) return false;

		Convers.remove({});
		Messages.remove({});
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