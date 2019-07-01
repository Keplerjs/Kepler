
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
	},
	/**
	 * reduce mutiplegeometry into single one if it contains only one geometry
	 * @param  {[type]} geom [description]
	 * @return {[type]}      [description]
	 */
	importGeometry: function(geom) {
		if(_.str.startsWith(geom.type,'Multi') && geom.coordinates.length===1) {
			return {
				type: geom.type.replace('Multi',''),
				coordinates: geom.coordinates[0] 
			}
		}
		else
			return geom;
	}
});