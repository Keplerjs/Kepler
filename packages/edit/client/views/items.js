


Template.item_place_edit.onRendered(function() {
	
	var self = this,
		tmpl = Template.instance();

	self.$('.btn-placedel').btsConfirmButton(function(e) {
		
		Meteor.call('removePlace', self.data.id, function(err,res) {
			K.Map.removeItem(self.data);		
			//Router.go('root');
		});			
	});
});
