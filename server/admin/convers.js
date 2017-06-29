
K.admin.addMethods({
	delAllConvers: function() {
		
		if(!K.admin.isMe()) return false;

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