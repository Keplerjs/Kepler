
Template.formImport.helpers({
	importDone: function() { 
		return function(ret) {
			console.log('importDone', ret)
		}
	}
});