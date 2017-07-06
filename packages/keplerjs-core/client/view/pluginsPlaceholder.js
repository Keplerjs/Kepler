
Template.pluginsPlaceholder.helpers({
	
	plugins: function() {
		
		//return [];

		var parentTemplate = Template.instance().view.parentView.name.replace('Template.','');
		
		console.log(parentTemplate)

		return _.map(K.plugins, function(plugin) {
			if(Template[parentTemplate+'_'+plugin.name]) {
				return {
					pluginTemplate: parentTemplate+'_'+plugin.name,
					pluginData: Template.currentData()
				};
			}
		});
	}
});