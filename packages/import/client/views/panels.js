
Template.formImport.helpers({
	importDone: function() {
		var tmpl = Template.instance();
		return function(ret) {
			tmpl.$('.import-text').text(ret)
		}
	}
});