
Template.sidebar.onRendered(function() {

	var $badge = this.$('.badge-notifs');

	this.$('.btn-notifs').popover().on('hidden.bs.popover', function () {
		$badge.remove();
		//TODO mark as read all 
	});
});

