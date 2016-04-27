/*
	global container
*/
Climbo = {
	version: '0.1.0',

	//models
	User: {},        //class for users                   (client)
	Place: {},       //class for places                  (client)	

	//modules
	map: {},         //module map, controls, layers      (client)
	alert: {},       //module notifications              (client)	
	conver: {},      //module messages, place comments   (client)
	profile: {},     //module user data, user panel      (client)
	geodata: {},     //module geographic data api        (server)
	cache: {},       //module caching system             (server)	

	//utils

	util: {},        //module utils functions            (client,server)
	perms: {},       //define fields in pubs/queries     (client,server)
	queries: {},     //list of shared function queries   (client,server)
	schemas: {},     //define base fields for models     (client,server)
	usersById: {},   //referer istances                  (client)
	placesById: {},  //referer istances                  (client)	

	//debugging
	placesByName: {} //search places by name in console  (client)
};

/*
 * Climbo.Class powers the OOP facilities of the library.
 * Thanks to John Resig and Dean Edwards for inspiration!
 */
Climbo.Class = function(){};
Climbo.Class.extend = function (props) {

	// extended class with the new prototype
	var NewClass = function () {

		// call the constructor
		if (this.init) {
			this.init.apply(this, arguments);
		}
	};

	// instantiate class without calling constructor
	var F = function(){};
	F.prototype = this.prototype;

	var proto = new F();
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	//inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}
	
	// mix given properties into the prototype
	_.extend(proto, props);

	var parent = this;
	// jshint camelcase: false
	NewClass.__super__ = parent.prototype;

	return NewClass;
};

Climbo.Class.include = function (props) {
	_.extend(this.prototype, props);
};


//TODO Climbo.Class.newItem = function(id) {...}