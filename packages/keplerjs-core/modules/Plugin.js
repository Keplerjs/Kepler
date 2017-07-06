/*
	core module for define and manage Kepler plugins
*/

K.plugins = {};

K.Plugin = function(p) {
	
	if(p.name && !this.plugins[''+p.name]) {
		this.plugins[''+p.name]= _.defaults(p, {
			order: 0,	 //placement priority from -10 to +10
			placeholders: {},
			filters: {},
			schemas: {},
			settings: {}
		});
	}
};