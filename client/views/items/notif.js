
Template.item_notif_clean.events({
	'click .notif-btn-clean': function(e,tmpl) {
		e.preventDefault();
		Users.update(Meteor.userId(), {
			$set: {
				notif: []
			}
		});
	}
});