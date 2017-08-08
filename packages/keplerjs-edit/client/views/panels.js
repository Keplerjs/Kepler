
Template.panelEdit.onRendered(function() {
	var self = this;
	self.$('.btn-editdel').btsConfirmButton(function(e) {
			
		Meteor.call('removePlace', self.data.id, function(err) {
		
			K.Map.removeItem(self.data);
		
			Router.go('root');
		});			
	});
});

Template.panelEdit.events({
	'click .btn-editren': function(e,tmpl) {
		var data = {
				name: tmpl.$('.input-editren').val()
			};

		Meteor.call('updatePlace', tmpl.data.id, data, function(err) {
			tmpl.data.update();
		});
	}
});