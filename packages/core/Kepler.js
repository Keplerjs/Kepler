/*
	global container
*/
Kepler = K = {
	version: '1.2.4',

	//core models
	Place: {},       //class for places                  (client)
	placeById: {},	 //constructor of Place  		     (client)

	User: {},        //class for users                   (client)
	userById: {},	 //constructor of User  		     (client)

	//config
	schemas: {},	 //base data structure for models    (client,server)
	filters: {},	 //specifiers for queries            (client,server)
	templates: {},//positions for plugins templates   (client,server)
	settings: {},	 //settings for core and plugins	 (client,server)

	//utilities
	Util: {},        //module utils functions            (client,server)
	Cache: {},       //module caching system             (client,server)
	Plugin: {},		 //module for managing plugins		 (client,server)

	//core modules
	Profile: {},     //module for user logged data       (client)
	Map: {},         //module map, controls, layers      (client)

	extend: function(e) {
		_.extend(this, e);
	}
};
