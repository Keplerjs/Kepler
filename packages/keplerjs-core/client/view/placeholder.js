
Template.placeholder.helpers({
	
	templates: function() {

		var templates = [];

		_.each(K.templates, function(ktemplates, placeholder) {

			if(placeholder === Template.currentData().name) {
			
				_.each(ktemplates, function(pluginTemplate) {
					if(Template[pluginTemplate]) {
						templates.push({
							pluginTemplate: pluginTemplate,
							pluginData: Template.parentData()
						});
					}
				});
			}
		});
		return templates;
	}
});