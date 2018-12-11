
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

//PATH
Session.set('showSidebar', true);

	this.methods.set(_.keys(K.Admin.method))
});

Template.panelAdmin.helpers({
	methods: function() {
		return Template.instance().methods.get();
	}
});
