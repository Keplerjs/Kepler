
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

		Meteor.call('updatePlace', tmpl.data.id, data);
	}
});


Template.panelUser_edit.events({
	'click .panel-btn-placesList': function(e, tmpl) {

		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');
		
		this.loadPlaces(function() {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});