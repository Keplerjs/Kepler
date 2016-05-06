Template.tab_bio.helpers({
	places: function() {
		return _.map(this.likeplaces, function(type) {
			return i18n('places.'+type);
		});
	}
});