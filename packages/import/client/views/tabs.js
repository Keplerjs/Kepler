
Template.popupImport.helpers({
	keys: function() {

		var ret = [];

		_.each(this.properties, function(val, key) {
			ret.push({
				key: key,
				val: val
			});
		});

		return ret;
	}
});
