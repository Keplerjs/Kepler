
Template.panelPlace_photos.helpers({
	uploadDone: function() {
		var tmpl = Template.instance();
		return function(ret) {
			console.log('uploadDone', ret);
		}
	}
});