
Template.itemNotifClean.events({
	'click .notif-btn-clean': function(e,tmpl) {
		e.preventDefault();
		K.profile.notifRead();
	}
});