/*
	global container
*/
Kepler = K = {
	version: '0.1.0',

	//models
	Class: {},  	 //class base for items         (client)
	Place: {},       //class for places             (client)
	User: {},        //class for users              (client)

	//modules
	map: {},         //module map, controls, layers      (client)
	notif: {},       //module notifications              (client)
	upload: {},      //module manage file uploads        (client)
	conver: {},      //module messages, place comments   (client)
	profile: {},     //module for user logged data       (client)
	router: {},      //module wrapper per router         (client)
	
	//utils
	util: {},        //module utils functions            (client,server)
	cache: {},       //module caching system             (client,server)	
	geoapi: {},      //module geographic data api        (server)
	fields: {},      //define fields in pubs/queries     (client,server)
	schemas: {},     //define base fields for models     (client,server)
	queries: {},     //list of shared function queries   (client,server)
	usersById: {},   //index of User instances           (client)
	placesById: {},  //index of Place instances          (client)

	//debugging
	placesByName: {}, //search places by name in console (client)
	usersByName: {},  //search places by name in console (client)
	admin: {}         //methods only for admin users     (client,server)
};


/*TODO
if(Meteor.isServer)
	Settings = _.extend(JSON.parse(Assets.getText('settings.default.json')), Meteor.settings);

else if(Meteor.isClient)
	Settings = Meteor.settings.public;
*/
