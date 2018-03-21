/*

	example of usage inside a template

	{{> pluginsTemplate name='panelPlace'}}

*/
Template.pluginsTemplate.helpers({
	templates: function() {

		var self = this,
			ret = [];

		if(!self.name) return ret;

		_.each(K.templates, function(pluginTmpls, parentName) {

			if(parentName === self.name) {

				var pluginData = Template.parentData();

				pluginTmpls = _.sortBy(pluginTmpls,'order');
				pluginTmpls = _.pluck(pluginTmpls,'name');
			
				_.each(pluginTmpls, function(pluginTemplate) {
					if(Template[pluginTemplate]) {
						ret.push({
							pluginTemplate: pluginTemplate,
							pluginData: pluginData
						});
					}
				});
			}
		});
		return ret;
	}
});