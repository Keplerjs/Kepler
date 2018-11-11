/*

	example of usage inside a template

	{{> pluginsTemplate name='panelPlace'}}

*/

Template.pluginsTemplate.helpers({
	templates: function() {
		return K.Plugin.templatesByPlaceholder(this.name, Template.parentData(), this.sep);
	}
});