
Template.formImport.helpers({
	importDone: function() {
		var tmpl = Template.instance();
		return function(ret) {
			tmpl.$('.import-text').text(ret)
		}
	}
});

Template.item_place_imported.onRendered(function() {
	
	var self = this,
		tmpl = Template.instance();

	self.$('.btn-placedel').btsConfirmButton(function(e) {
		
		Meteor.call('removePlace', self.data.id, function(err,res) {
			K.Map.removeItem(self.data);		
			//Router.go('root');
		});			
	});
});
