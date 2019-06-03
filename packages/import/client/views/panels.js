
Template.formImport.onCreated(function() {

    this.importName = new ReactiveVar('');

});

Template.formImport.helpers({
	importParams: function() {
		var tmpl = Template.instance();
		return {
			importname: tmpl.importName.get()
		};
	},
	importOnSelect: function() {
		var tmpl = Template.instance();
		return function(target, fileObj, params) {
			var name$ = tmpl.$('.import-name');
			name$.val( K.Import.importnameFromFile(fileObj) );
		}
	},
	importOnUploaded: function() {
		var tmpl = Template.instance();
		return function(ret) {
			K.Alert.info(ret)
		}
	}
});

Template.formImport.events({
	'change .import-name': function(e, tmpl) {
		tmpl.importName.set(e.target.value)
	}
});
