
_.extend(K.Util.sanitize, {
	catName: function(name) {
		
		name = Latinize(name);

		name = name.toLowerCase();

		name = _.str.camelize(name);

		name = name
			.replace(/[^a-zA-Z0-9\\\-\._]/g,'')
			.replace(/\.\./g,'.')
			.replace(/\//g,'')
			.replace(/[\-\._]/g,'');

		return name.substr(0,25);;
	}
});
