/*
	core module for define and manage Kepler plugins
*/

//TODO execute code inside Plugin() at Meteor.startup(), not immediately. for using K.settings

Kepler.plugins = {};

Kepler.Plugin = function(plugin) {
	
	if(plugin && _.isString(plugin.name) && plugin.name!=='')
	{
		if(!this.plugins[plugin.name]) {

			if(_.isObject(plugin.templates)) {

				for(var placeholder in plugin.placeholders) {
					if(plugin.placeholders[placeholder] && !K.templates[placeholder])
						K.templates[placeholder]= {};
				}
		
				for(var placeholder in K.templates) {
					if(plugin.templates[placeholder]) {
						
						var tt = K.Plugin.normalizePlacehoders(plugin.templates[placeholder], plugin.name);
						
						_.extend(K.templates[placeholder], tt);
					}
				}
			}
			
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
/**
 * fill not defined fields with defaults values in plugin config teomplates
 * @param  {[type]} tt [description]
 * @return {[type]}    [description]
 */
Kepler.Plugin.normalizePlacehoders = function(tt, plugin) {
	
	//TODO add new field 'replace'
	
	if(_.isString(tt))
		tt = _.object([tt],[true]);
	
	for(var t in tt) {
		if(tt[t]===true)
			tt[t]= {};

			if(_.isObject(tt[t])) {
			tt[t]= _.defaults(tt[t], {
				plugin: plugin,
				show: true,
				order: 0
			});
		}
		else if(tt[t]===false)
			tt[t]= {show: false};
	}
	return tt;
};

Kepler.Plugin.templatesByPlaceholder = function(placeholder, data) {
	var tmpls = [], sorts = [];

	if(!placeholder) return tmpls;

	for(var parentName in K.templates) {

		if(parentName === placeholder) {
			//convert in array of objects
			//TODO https://stackoverflow.com/questions/49611332/underscorejs-object-to-collection
			var arr = _.map(K.templates[parentName], function(v,k) {
				v.name = k;
				return v;
			});

			sorts = _.sortBy(arr, 'order');

			for(var s in sorts) {
				if(sorts[s].show) {
					tmpls.push({
						pluginTemplate: sorts[s].name,
						pluginData: data
					});
				}
			}
		}
	}

	return tmpls;	
};

if(Meteor.isClient) {
	Meteor.startup(function() {
		var sets = K.settings.public.templates;

		for(var placeholder in K.templates) {
			
			var tt = K.templates[placeholder];

			for(var t in tt) {
				if(!Template[t]) {
					console.warn('Template not exists: "'+t+'", defined in plugin: '+tt[t].plugin)
					delete tt[t];
				}
			}	
		}

		for(var placeholder in sets) {

			if(!K.templates[placeholder]) continue;

			_.extend(K.templates[placeholder], K.Plugin.normalizePlacehoders(sets[placeholder]) );
		}

	});
}

if(Meteor.isServer) {
	Meteor.startup(function() {
		console.log('Plugins: ', _.keys(K.plugins).join(','));
	});
}