
_.extend(K.Util.sanitize, {
	catName: function(name) {
		
		name = Latinize(name);

		name = _.str.camelize(name);
		return name
			.replace(/[^a-zA-Z0-9\\\-\._]/g,'')
			.replace(/\.\./g,'.')
			.replace(/\//g,'')

			.replace(/[\-\._]/g,'');
	}
});