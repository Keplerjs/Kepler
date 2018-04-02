/*

	example of usage inside a template

	{{> pluginsTemplate name='panelPlace'}}

*/

Template.pluginsTemplate.helpers({
	templates: function() {
		if(!Template[this.name]) return [];

		return K.Plugin.templatesByPlaceholder(this.name, Template.parentData());
	}
});