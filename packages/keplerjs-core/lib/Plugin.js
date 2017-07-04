
Kepler.Plugin = {
	
	_plugins: {},

	registerPlugin: function(plugin) {
		if(plugin.name && !this._plugins[plugin.name]) {
			this._plugins[''+plugin.name]= _.defaults(plugin, {
				templates: [],
				priority: 0 //placement priority from -10 to +10
				//fields: {}
			});
		}
	},

	getPlugins: function() {
		return this._plugins;
	},

	getPluginsByTemplate: function(template) {
		return this._plugins;
	}
};

/*if(Meteor.isServer) {
	console.log('SERVER',Template)
}*/