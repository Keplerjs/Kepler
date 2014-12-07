
Template.tab_checkin.helpers({
	place: function() {
		return Climbo.profile.getCheckin();
	}
});
