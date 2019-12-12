
if(K.Admin)
K.Admin.methods({
	removeAllPois: function() {
		
		if(!K.Admin.isMe()) return false;

		Pois.remove({});
		K.Cache.clean('pois');
	}	
});