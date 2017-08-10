
Template.layoutMap.onCreated(function() {
	Session.set('showSidebar',false);
});

Template.layoutMap.helpers({
	showSidebar:function() {
		return !!Session.get('showSidebar');
	}
});