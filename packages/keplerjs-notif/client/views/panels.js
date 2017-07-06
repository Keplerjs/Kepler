
Template.list_notif_clean.events({
	'click .notif-btn-clean': function(e,tmpl) {
		e.preventDefault();
		K.Notif.cleanAll();
	}
});