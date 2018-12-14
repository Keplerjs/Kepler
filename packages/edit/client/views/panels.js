
Template.panelPlaceEdit.onRendered(function() {
	var self = this;
	
	self.$('.btn-editdel').btsConfirmButton(function(e) {

		Meteor.call('removePlace', self.data.id, function(err) {
		
			if(err)
				console.warn(err.message);
			else
			{
				K.Map.removeItem(self.data);
			
				Router.go('root');
			}
		});			
	});
});

Template.panelPlaceEdit.events({
	'click .btn-editren': function(e,tmpl) {
		var place = tmpl.data,
			data = {
				name: tmpl.$('.input-editren').val()
			};

		Meteor.call('updatePlace', place.id, data, function(err) {
			place.update();
		});
	},
	'keydown .input-editren': function(e,tmpl) {
		if(e.keyCode===13) {//enter
			e.preventDefault();
			tmpl.$('.btn-editren').trigger('click');
		}
	},
	'click .btn-cancelren': function(e,tmpl) {
		tmpl.$('.input-editren').val('');
	}
});

Template.tabUser_edit.events({
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