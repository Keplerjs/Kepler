/*
	core module for define and manage Kepler plugins
*/

Kepler.plugins = {};

Kepler.Plugin = function(plugin) {
	
	if(plugin && _.isString(plugin.name) && plugin.name!=='')
	{
		if(!this.plugins[plugin.name]) {
		
			if(_.isObject(plugin.templates))
				_.each(K.templates, function(tmpls, name) {
					if(plugin.templates[name]) {
						var tt = _.union(tmpls, plugin.templates[name]);

						K.templates[name] = _.map(tt, function(v) {
							return _.isObject(v) ? v : {name: v, order: 0};
						});
					}
				});
			
			if(_.isObject(plugin.filters))
				_.deepExtend(K.filters, plugin.filters);
			
			if(_.isObject(plugin.schemas))
				_.deepExtend(K.schemas, plugin.schemas);

			if(_.isObject(plugin.settings))
				_.deepExtend(K.settings, plugin.settings);

			this.plugins[plugin.name] = plugin;
		}
		else
			console.warn("Plugin: just defined", plugin)
	}
	else
		console.warn("Plugin: require name", plugin)
};

if(Meteor.isServer) {
	Meteor.startup(function() {
		console.log('Plugins: ', _.keys(K.plugins).join(','));
	});
}
