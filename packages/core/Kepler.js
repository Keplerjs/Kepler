var version = '1.7.0';
/**
 * @namespace
 * @name Kepler
 */
Kepler = {
	/**
	 * @constant
	 * @type {String}
	 */
	version: version,
	/**
	 * extend global Kepler object
	 * @param  {Object} e [description]
	 * @return {Object}   [description]
	 */
	extend: function(e) {
		return _.extend(this, e);
	},

	//core models
	Place: {},       //class for places                  (client)
	User: {},        //class for users                   (client)
	placeById: {},	 //constructor of Place  		     (client)
	userById: {},	 //constructor of User  		     (client)

	//config
	schemas: {},	 //base data structure for models    (client,server)
	filters: {},	 //specifiers for queries            (client,server)
	queries: {},	 //selectors for queries             (client,server)
	templates: {},   //positions for plugins templates   (client,server)
	settings: {},	 //settings for core and plugins	 (client,server)

	Util: {},        //module utils functions            (client,server)
	Cache: {},       //module caching system             (client,server)
	Plugin: {},		 //module for managing plugins		 (client,server)

	//core modules
	Profile: {},     //module for user logged data       (client)
	Map: {},         //module map, controls, layers      (client)
	Alert: {},		 //module to show alerts in client	 (client)	
};

/**
 * @global
 */
K = Kepler;
M = Meteor;