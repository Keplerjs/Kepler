
Template.panelPlace_tracks.events({
	'click .panel-btn-tracks': function(e, tmpl) {
		tmpl.data.loadTracks(this._id);
	}
});