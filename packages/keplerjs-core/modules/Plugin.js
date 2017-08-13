/*
	core module for define and manage Kepler plugins
*/

Kepler.plugins = {};

Kepler.Plugin = function(plugin) {
	
	if(plugin && _.isString(plugin.name) && plugin.name!=='')
	{
		if(!this.plugins[plugin.name]) {
		
			if(_.isObject(plugin.placeholders))
				_.each(K.placeholders, function(tmpls, name) {
					if(plugin.placeholders[name])
						K.placeholders[name] = _.union(tmpls, plugin.placeholders[name]);
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
		console.log('Plugin: plugins loaded is ', _.keys(K.plugins).join(','));
	});
}
