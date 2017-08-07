
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

Template.panelPlaceEdit.onRendered(function() {
	var self = this;
	self.$('.btn-editdel')
		.btsConfirmButton(i18n('btn_del'), function(e) {
			
			Meteor.call('removePlace', self.data.id, function(err) {
			
				K.Map.removeItem(self.data);
			
				Router.go('root');
			});			
		});
});

Template.panelPlaceEdit.events({
	'click .btn-editren': function(e,tmpl) {
		var data = {
				name: tmpl.$('.input-editren').val()
			};

	console.log('updatePlace', tmpl.data.id, data)

		Meteor.call('updatePlace', tmpl.data.id, data, function() {

			tmpl.data.update();
		});
	}
});