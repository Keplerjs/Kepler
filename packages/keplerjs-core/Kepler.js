/*
	global container
*/
Kepler = K = {
	version: '0.1.0',

	//core models
	Place: {},       //class for places                  (client)
	placeById: {},	 //constructor of Place  		     (client)

	User: {},        //class for users                   (client)
	userById: {},	 //constructor of User  		     (client)

	//config
	schemas: {},	 //base data structure for models    (client,server)
	filters: {},	 //specifiers for queries            (client,server)

	//utilities
	Util: {},        //module utils functions            (client,server)
	Cache: {},       //module caching system             (client,server)

	//core modules
	Plugin: {},		 //module for managing plugins		 (client,server)
	Profile: {},     //module for user logged data       (client)
	Map: {},         //module map, controls, layers      (client)

	//managing
	Admin: {},       //methods only for admin users      (client,server)

	extend: function(e) {
		_.extend(this, e);
	}
};

Kepler.extend({
	//others modules
	Upload: {},      //module manage file uploads        (client)
	Conver: {},      //module messages, place comments   (client)
	Notif: {},       //module notifications              (client)
});