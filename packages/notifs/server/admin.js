
if(K.Admin)
K.Admin.methods({
	insertNotif: function(text, type) {
		
		if(!K.Admin.isMe()) return false;
	
		K.insertNotif(text, type);
	}
});