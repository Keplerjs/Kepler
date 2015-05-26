Template.panel_bio.helpers({
	likeplaces: function() {
		return _.str.toSentence(_.map(this.data.likeplaces, function(type) {
				return i18n('ui.places.'+type);
			}), ', ', ' '+i18n('words.and')+' ');
	}
});