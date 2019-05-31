
Template.formImport.helpers({
	importParams: function() {

		return {
			importName: 'cose-nome'
		};
	},
	importSelect: function() {
		
		console.log(this)

		var tmpl = Template.instance();
		return function(target, fileObj, params) {
			var name$ = tmpl.$('.import-name');
			name$.val( K.Import.importnameFromFile(fileObj) );
		}
	},
	importDone: function() {
		//var tmpl = Template.instance();
		return function(ret) {
			K.Alert.info(ret)
		}
	}
});
