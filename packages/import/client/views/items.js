
Template.itemPlaceImport.onRendered(function() {
	
	var self = this;

	self.$('.btn-del').btsConfirmButton(function(e) {
		
		Meteor.call('removePlace', self.data.id, function(err,res) {
			K.Map.removeItem(K.placeById(self.data.id));
			//Router.go('root');
		});			
	});
});


Template.itemImport.onRendered(function() {
	
	var self = this;

	self.$('.btn-del').btsConfirmButton(function(e) {
		
		Meteor.call('removeImport', self.data.name, function(err,res) {
			sAlert.info('Removed '+res+' places by import name: '+self.data.name);
		});			
	});
});
