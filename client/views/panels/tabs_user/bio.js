Template.panel_bio.helpers({
	likeplaces: function() {
		return _.str.toSentence(_.map(this.data.likeplaces, function(type) {
				return Climbo.i18n.ui.places[type];
			}), ', ', ' '+Climbo.i18n.words.and+' ');
	}
});