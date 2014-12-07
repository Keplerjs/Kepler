

Template.panel_profile.events({
	'click .profile-btn-stars': function() {
		Climbo.profile.loadFavorites();
	},
	'click .profile-btn-notif': function() {
		Climbo.profile.loadNotif();
	},	
	'click .profile-btn-convers': function() {
		Climbo.profile.loadConvers();	
	},		
	'click .profile-btn-sets': function() {
		$('#settings').modal('show');
	},
	'click .profile-btn-logout': function() {
		Climbo.profile.logout();
	}
});
