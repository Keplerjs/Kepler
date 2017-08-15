/*

	example of usage inside a template

	{{> pluginPlaceholder name='panelPlace'}}

*/
Template.pluginPlaceholder.helpers({
	templates: function() {

		var self = this,
			ret = [];

		if(!self.name) return ret;

		_.each(K.placeholders, function(templates, placeholder) {

			if(placeholder === self.name) {
			
				_.each(templates, function(pluginTemplate) {
					if(Template[pluginTemplate]) {
						ret.push({
							pluginTemplate: pluginTemplate,
							pluginData: Template.parentData()
						});
					}
				});
			}
		});
		return ret;
	}
});