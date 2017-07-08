
K.Admin.methods({
	insertNotif: function(text, type) {
		
		if(!K.Admin.isMe()) return false;
		
		Users.update(this.userId, {
			$push: {
				notifs: text
			}
   		});
	}
});