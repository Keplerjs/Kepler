/*
	core module for define and manage Kepler plugins
*/

K.plugins = {};

K.templates = {		//list of templates loaded in each placeholders
	panelPlace: [],
	popupPlace: [],
	itemPlace:  []
};

K.Plugin = function(plugin) {
	
	if(plugin && _.isString(plugin.name) && plugin.name!=='')
	{
		if(!this.plugins[plugin.name]) {
		
		
			if(_.isObject(plugin.templates))
				_.each(K.templates, function(tmpls, name) {
					if(plugin.templates[name])
						K.templates[name] = _.union(tmpls, plugin.templates[name]);
				});
			
			if(_.isObject(plugin.filters))
				_.deepExtend(K.filters, plugin.filters);
			
			if(_.isObject(plugin.schemas))
				_.deepExtend(K.schemas, plugin.schemas);

/*			if(_.isObject(plugin.settings))
				_.deepExtend(K.settings, plugin.settings);	*/		

			this.plugins[plugin.name] = plugin;
		}
		else
			console.warn("Plugin: just defined", plugin)
	}
	else
		console.warn("Plugin: require name", plugin)
};