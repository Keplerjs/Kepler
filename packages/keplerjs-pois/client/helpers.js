
Template.registerHelper('poiTypeByTags', function(tags) {
	return K.Pois.typeByTags(tags);
});

Template.registerHelper('poiTypeNameByTags', function(tags) {
	var type = K.Pois.typeByTags(tags);
	return i18n('pois_type_'+type);
});
