
K.Admin.addMethods({
	delAllConvers: function() {
		
		if(!K.Admin.isMe()) return false;

		Convers.remove(true);
		Messages.remove(true);
		Users.update(true, {
			$set: {
				convers: []
			}
   		},{multi: true});
		Places.update(true, {
			$set: {
				convers: []
			}
   		},{multi: true});
	}	
});