
Template.panelPlace_admin.onRendered(function() {
	var self = this;
	self.$('.btn-editdel').btsConfirmButton(function(e) {
			
		K.Admin.removePlace(self.data.id)
		
		K.Map.removeItem(self.data);
	
		Router.go('root');
	});
});
