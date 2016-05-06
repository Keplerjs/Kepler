
Template.navbar.helpers({
	title: function() {
		//console.log('navbar',Template.parentData());
		return this.title || i18n('titles.'+ Router.current().route.getName() );
	}
});
