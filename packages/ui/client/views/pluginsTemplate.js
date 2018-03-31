/*

	example of usage inside a template

	{{> pluginsTemplate name='panelPlace'}}

*/
Template.pluginsTemplate.helpers({
	templates: function() {

		var self = this,
			tmpls = [];

		if(!self.name) return tmpls;

		_.each(K.templates, function(pluginTmpls, parentName) {

			if(parentName === self.name) {

				var pluginData = Template.parentData();
						
				//TODO replace field						

				pluginTmpls = _.sortBy(pluginTmpls,'order');
				pluginTmpls = _.pluck(pluginTmpls,'name');
			
				_.each(pluginTmpls, function(pluginTemplate) {
					if(Template[pluginTemplate]) {
						tmpls.push({
							pluginTemplate: pluginTemplate,
							pluginData: pluginData
						});
					}
				});
			}
		});
		return tmpls;
	}
});