
K.admin.methods({
	adminDeleteAllConvers: function() {
		
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
		console.log('adminDeleteAllConvers');
	}	
});