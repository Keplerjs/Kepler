
K.admin.addMethods({
	createNotif: function(text, type) {
		
		if(!K.admin.isMe()) return false;
		
		Users.update(this.userId, {
			$push: {
				notif: text
			}
   		});
	}
});