
_.extend(K.Util.sanitize, {
	catName: function(name) {
		name = K.Util.sanitize.fileName(name);
		return name
			.replace(/[\-\._]/g,'');
	}
});