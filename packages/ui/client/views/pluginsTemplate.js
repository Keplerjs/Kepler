/**
 * 	example of usage inside a template: {{> pluginsTemplate name='panelPlace'}}
 */

/*Template.pluginsTemplate.onCreated(function() {
	console.log('pluginsTemplate onRendered')

});
*/
Template.pluginsTemplate.helpers({
	templates: function() {
		var data = Template.parentData();
		return K.Plugin.templatesByPlaceholder(this.name, data, this.sep);
	}
});