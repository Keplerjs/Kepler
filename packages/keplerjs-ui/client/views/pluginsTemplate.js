/*

	example of usage inside a template

	{{> pluginsTemplate name='panelPlace'}}

*/
Template.pluginsTemplate.helpers({
	templates: function() {

		var self = this,
			ret = [];

		if(!self.name) return ret;

		_.each(K.templates, function(pluginTemplates, parentName) {

			if(parentName === self.name) {

				var pluginData = Template.parentData();

				//console.log('pluginData', self.name, pluginData)
			
				_.each(pluginTemplates, function(pluginTemplate) {
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