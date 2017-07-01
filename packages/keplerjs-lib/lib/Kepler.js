/*
	global container
*/
Kepler = {
	version: '0.1.0',

	//core models
	Class: {},  	 //class base for items         (client)
	Place: {},       //class for places             (client)
	User: {},        //class for users              (client)

	//core modules
	map: {},         //module map, controls, layers      (client)
	notif: {},       //module notifications              (client)
	upload: {},      //module manage file uploads        (client)
	conver: {},      //module messages, place comments   (client)
	router: {},      //module wrapper per router         (client)
	profile: {},     //module for user logged data       (client)
	
	//utilities
	util: {},        //module utils functions            (client,server)
	cache: {},       //module caching system             (client,server)	
	fields: {},      //define fields in pubs/queries     (client,server)
	schemas: {},     //define base fields for models     (client,server)
	usersById: {},   //index of User instances           (client)
	placesById: {},  //index of Place instances          (client)
	//TODO queries: {},//list of shared function queries (client,server)	
	
	//managing
	admin: {},       //methods only for admin users      (client,server)	
	placesByName: {},//index of places by name           (client)
	usersByName: {}, //index of users by name            (client)

	//plugins
	plugins: {}	     //plugins loaded					 (client,server)
};

K = Kepler;

/*TODO
if(Meteor.isServer)
	Settings = _.extend(JSON.parse(Assets.getText('settings.default.json')), Meteor.settings);

else if(Meteor.isClient)
	Settings = Meteor.settings.public;
*/
