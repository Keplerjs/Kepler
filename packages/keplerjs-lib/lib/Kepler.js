/*
	global container
*/
Kepler = {
	version: '0.1.0',

	//core models
	Model: {},  	 //class base for items         (client)
	Place: {},       //class for places             (client)
	User: {},        //class for users              (client)
	newPlace: {},	 //constructor of Place  		(client)
	newUser: {},	 //constructor of User  		(client)
	usersById: {},   //index of User instances      (client)
	placesById: {},  //index of Place instances     (client)

	//core modules
	Map: {},         //module map, controls, layers      (client)
	notif: {},       //module notifications              (client)
	upload: {},      //module manage file uploads        (client)
	conver: {},      //module messages, place comments   (client)
	router: {},      //module wrapper per router         (client)
	profile: {},     //module for user logged data       (client)

	//utilities
	util: {},        //module utils functions            (client,server)
	Cache: {},       //module caching system             (client,server)	
	Field: {},       //define fields in pubs/queries     (client,server)
	Schema: {},      //define base fields for models     (client,server)
	Plugin: {},	 	 //plugins registered				 (client,server)	
	//TODO queries: {},//list of shared function queries (client,server)	
	
	//managing
	Admin: {},       //methods only for admin users      (client,server)	
	placesByName: {},//index of places by name           (client)
	usersByName: {}, //index of users by name            (client)
};

K = Kepler;

/*TODO
if(Meteor.isServer)
	Settings = _.extend(JSON.parse(Assets.getText('settings.default.json')), Meteor.settings);

else if(Meteor.isClient)
	Settings = Meteor.settings.public;
*/
