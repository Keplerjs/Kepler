/*
	global container
*/
Kepler = K = {
	version: '0.1.0',

	//core models
	Place: {},       //class for places             (client)
	placeById: {},	 //constructor of Place  		(client)

	User: {},        //class for users              (client)
	userById: {},	 //constructor of User  		(client)

	//utilities
	Util: {},        //module utils functions            (client,server)
	Cache: {},       //module caching system             (client,server)

	//core modules
	Profile: {},     //module for user logged data       (client)
	Map: {},         //module map, controls, layers      (client)
	Plugin: {},		 //module for managing plugins		 (client,server)

	//managing
	Admin: {},       //methods only for admin users      (client,server)

	extend: function(e) {
		_.extend(this, e);
	}
};

K.extend({
	schema: {},
	schemas: function(q) {
		_.extend(this.schema, q);
	},
	filter: {},
	filters: function(q) {
		_.extend(this.filter, q);
	},
	query: {},
	queries: function(q) {
		//TODO add console.log in any queries
		_.extend(this.query, q);
		_.extend(this, q);//for convenience copy in K. namespace
	}
});

K.extend({
	//others modules
	Upload: {},      //module manage file uploads        (client)
	Conver: {},      //module messages, place comments   (client)
	Notif: {},       //module notifications              (client)
});