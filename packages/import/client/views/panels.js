
Template.formImport.helpers({
	importDone: function() {
		var tmpl = Template.instance();
		return function(ret) {
			sAlert.info(ret)
		}
	}
});
