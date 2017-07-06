/*
	core module for define and manage Kepler plugins
*/

K.plugins = {};
K.placeholders = {};

K.Plugin = function(def) {
	
	if(!def.name)
		console.warn("Plugin: require name",def)

	var plugin, kplugin = this.plugins[''+def.name];

	if(!kplugin) {
		plugin = _.defaults(def, {
			order: 0,	 //placement priority from -10 to +10
			placeholders: {},
			filters: {},
			schemas: {},
			settings: {}
		});
		_.extend(K.placeholders, plugin.placeholders);
		_.extend(K.filters, plugin.filters);
		_.extend(K.schemas, plugin.schemas);
		//_.extend(K.settings, p.settings);

		kplugin = plugin;
	}
};