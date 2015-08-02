Template.panel_bio.helpers({
	places: function() {
		console.log(this)
		return _.map(this.likeplaces, function(type) {
			return i18n('ui.places.'+type);
		});
	}
});