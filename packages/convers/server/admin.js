
if(K.Admin)
K.Admin.methods({
	removeAllConvers: function() {
		
		if(!K.Admin.isMe()) return false;

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