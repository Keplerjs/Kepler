
Template.layoutMap.onCreated(function() {
	Session.set('showSidebar',true);
});

Template.layoutMap.helpers({
	showSidebar:function() {
		return !!Session.get('showSidebar');
	}
});