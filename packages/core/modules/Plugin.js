/*
	core module for define and manage Kepler plugins
	//TODO create handlebars helper to check if a placeholder have plugins
*/

/**
 * index of defined plugins
 * @memberOf Plugin
 * @type {Object}
 */
Kepler.plugins = {};

/** 
 * define new Kepler plugin by config
 * @namespace
 * @name Plugin
 * @memberOf Kepler
 * @param {Object} new plugin configuration
 */
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

				//TODO REFACT apply extend sort by ptmpls
				for(var placeholder in K.templates) {
					if(_.isObject(K.templates[placeholder]) && ptmpls[placeholder]) {
						
						var tt = K.Plugin.normalizePlaceholders(ptmpls[placeholder], plugin.name);
						
						_.extend(K.templates[placeholder], tt);
					}
				}
			}
			
			if(_.isObject(plugin.queries)) {
				//DONT USER deepExtend that not support functions as value
				_.extend(K.queries, plugin.queries);
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
 * @memberOf Kepler.Plugin
 * @param  {Array}  tmpls array of templates config
 * @param  {String} plugin 
 * @return {Array}  
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
/**
 * return list od templates names for certain Kepler placeholder
 * @param  {String} placeholder name
 * @param  {Object} data for each templates
 * @param  {String} separator  html string 
 * @return {Array}
 */
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

			var len = sorts.length-3,
				add = false;

			for(var s in sorts) {

				if(_.isBoolean(sorts[s].show))
					add = sorts[s].show;
				else if(_.isFunction(sorts[s].show))
					add = sorts[s].show(placeholder, data, sep);
				else
					add = false;

				if(add) {
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
