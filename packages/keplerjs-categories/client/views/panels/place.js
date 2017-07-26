
Template.panelPlace_cats.helpers({
	placeCats: function() {
		return _.map(this.data.cats, function(type) {
			return i18n('cats.place.'+type);
		});
	}
});