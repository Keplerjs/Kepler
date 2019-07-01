
Template.itemPlaceImport.onRendered(function() {
	
	var self = this;

	self.$('.btn-del').btsConfirmButton(function(e) {
		$(e.target).addClass('disabled');
		Meteor.call('removePlace', self.data.id, function(err,res) {
			K.Map.removeItem(K.placeById(self.data.id));
		});			
	});
});

Template.itemImport.onRendered(function() {
	
	var self = this;

	self.$('.btn-del').btsConfirmButton(function(e) {
		$(e.target).addClass('disabled');
		Meteor.call('removeImport', self.data.name, function(err,res) {
			K.Alert.info('Removed '+res+' places by import name: '+self.data.name);
		});			
	});
});
