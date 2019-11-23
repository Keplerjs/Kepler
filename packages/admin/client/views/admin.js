
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
