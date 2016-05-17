
K.admin.methods({
	adminCreateNotif: function(text, type) {
		
		Users.update(this.userId, {
			$push: {
				notif: text
			}
   		});

		console.log('adminCreateNotif');
	}
});