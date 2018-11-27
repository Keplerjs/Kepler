
Template.panelUser_admin.onRendered(function() {
	var self = this;
	self.$('.btn-editdel').btsConfirmButton(function(e) {
			
		K.Admin.removeUser(self.data.username)
		
		K.Map.removeItem(self.data);
	
		Router.go('root');
	});
});


Template.panelAdmin.onCreated(function() {

    this.methods = new ReactiveVar();

});

Template.panelAdmin.onRendered(function() {

	this.methods.set(_.keys(K.Admin.method))
});

Template.panelAdmin.helpers({
	methods: function() {
		return Template.instance().methods.get();
	}
});

/*
Template.panelAdmin.helpers({
	methods: function() {
		return _.keys(K.Admin.method)
	}
});*/
/*
//	debug actions
	'click .popup-move': function(e,tmpl) {
		
		var self = this;
		
		if(self.marker.draggable) {
			var ll = self.marker.getLatLng(),
				loc = [ll.lat, ll.lng];
			//if(confirm("Aggiornare posizione???"))
				Meteor.call('movePlace', self.id, loc, function(err) {
					self.marker.setLatLng(loc);
				});
			
			$(e.target).text('Move');
			$(e.target).siblings('.popup-canc').hide();
		}
		else
		{
			$(e.target).text('Save');
			$(e.target).siblings('.popup-canc').show();
		}
		
		self.marker.drag();
	},
	'click .popup-movecanc': function(e,tmpl) {
		$(e.target).hide();
		$(e.target).siblings('.popup-move').text('Move');
		this.marker.drag();
	}*/