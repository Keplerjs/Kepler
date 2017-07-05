/*
	core module for define and manage Kepler plugins
*/

K.pluginsByName = {};

K.Plugin = function(p) {
	
	if(p.name && !this.pluginsByName[''+p.name]) {
		this.pluginsByName[''+p.name]= _.defaults(p, {
			order: 0,	 //placement priority from -10 to +10
			filters: {},
			schemas: {},
			settings: {},
			templates: {}
		});
	}
};