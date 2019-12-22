

Template.registerHelper('osmEditUrlById', function(osmid) {
	var id = osmid.split('/').join('=');
	return 'https://www.openstreetmap.org/edit?'+id+'&amp;editor=id';
});