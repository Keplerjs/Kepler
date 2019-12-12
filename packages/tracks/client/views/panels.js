
Template.tabPlace_tracks.events({
	'click .panel-btn-tracksList': function(e, tmpl) {
		e.preventDefault();
		this.loadTracks();
	}
});