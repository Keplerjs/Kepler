/*
	core module for define and manage Kepler plugins
*/

//TODO execute code inside Plugin() at Meteor.startup(), not immediately. for using K.settings

Kepler.plugins = {};

Kepler.Plugin = function(plugin) {
	
	if(plugin && _.isString(plugin.name) && plugin.name!=='')
	{
		if(!this.plugins[plugin.name]) {

			var ptmpls = plugin.templates;

			if(_.isObject(ptmpls)) {

				for(var placeholder in ptmpls) {
					if(ptmpls[placeholder] && !_.has(K.templates,placeholder) )
						K.templates[placeholder]= {};
				}

				for(var placeholder in K.templates) {
					if(_.isObject(K.templates[placeholder]) && ptmpls[placeholder]) {
						
						var tt = K.Plugin.normalizePlaceholders(ptmpls[placeholder], plugin.name);
						
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
Kepler.Plugin.normalizePlaceholders = function(tmpls, plugin) {
	
	//TODO add new field 'replace'
	
	if(_.isString(tmpls))
		tmpls = _.object([tmpls],[true]);
	
	for(var t in tmpls) {
		if(tmpls[t]===true)
			tmpls[t]= {};

			if(_.isObject(tmpls[t])) {
			tmpls[t]= _.defaults(tmpls[t], {
				plugin: plugin,
				show: true,
				order: 0
			});
		}
		else if(tmpls[t]===false)
			tmpls[t]= {show: false};
	}
	return tmpls;
};

Kepler.Plugin.templatesByPlaceholder = function(placeholder, data, sep) {
	
	sep = sep || "\n";

	var tmpls = [],
		sorts = [];

	if(!placeholder 
		//TODO uncomment and decide if check also it.. || !Template[placeholder]
		) return tmpls;

	for(var parentName in K.templates) {

		if(parentName === placeholder) {

			//convert in array of objects
			//TODO https://stackoverflow.com/questions/49611332/underscorejs-object-to-collection
			var arr = _.map(K.templates[parentName], function(v,k) {
				v.name = k;
				return v;
			});

			sorts = _.sortBy(arr, 'order');

			var len = sorts.length-3;
			for(var s in sorts) {
				if(sorts[s].show) {
					tmpls.push({
						pluginTemplate: sorts[s].name,
						pluginData: data,
						pluginSep: s<len ? sep : ''
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
			
			var tmpls = K.templates[placeholder];

			for(var t in tmpls) {
				if(!Template[t]) {
					console.warn('Template not exists: "'+t+'", defined in plugin: '+tmpls[t].plugin)
					delete tmpls[t];
				}
			}	
		}

		for(var placeholder in sets) {

			if(sets[placeholder].show===false)
				delete K.templates[placeholder];

			if(!K.templates[placeholder]) continue;

			_.extend(K.templates[placeholder], K.Plugin.normalizePlaceholders(sets[placeholder]) );
		}

	});
}

if(Meteor.isServer) {
	Meteor.startup(function() {
		console.log('Plugins: ', _.keys(K.plugins).join(','));
	});
}