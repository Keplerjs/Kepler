
Template.panelPlace_tracks.events({
	'click .panel-btn-tracksList': function(e, tmpl) {
		e.preventDefault();
		this.loadTracks();
	},
	'click .panel-btn-track': function(e, tmpl) {
		e.preventDefault();
		tmpl.data.showTracks(this._id);
	}
});