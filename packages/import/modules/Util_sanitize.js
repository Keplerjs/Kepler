
_.extend(K.Util.sanitize, {
	importName: function(name) {

		name = K.Util.sanitize.fileName(name, true);

		name = Latinize(name);

		name = name.toLowerCase();
		name = _.str.camelize(name)
		name = _.str.underscored(name);

		name = name
			.replace(/[^a-zA-Z0-9\\\-\._]/g,'')
			.replace(/\.\./g,'.')
			.replace(/\//g,'')
			.replace(/[\-\.]/g,'');

		return name;
	}
});