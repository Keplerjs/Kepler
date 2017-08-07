
Template.panelPlace_edit.onRendered(function() {
	var self = this;
	self.$('.btn-editdel')
		.btsConfirmButton(i18n('btn_del'), function(e) {
			
			Meteor.call('removePlace', self.data.id, function(err) {
			
				K.Map.removeItem(self.data);
			
				Router.go('root');
			});			
		});
});
