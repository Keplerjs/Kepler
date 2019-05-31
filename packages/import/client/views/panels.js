
Template.formImport.helpers({
	importDone: function() {
		//var tmpl = Template.instance();
		return function(ret) {
			K.Alert.info(ret)
		}
	}
});
