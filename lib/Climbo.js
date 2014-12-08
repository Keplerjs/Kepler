
Climbo = {

	//modules
	alerts: {},		//module notifications
	convers: {},	//module messages, place comments
	dialogList: {},	//module modal lists
	msg: {},		//module modal generic message
	map: {},		//module map, controls, popups, panels, layers
	profile: {},	//module user data, user panel
	settings: {},	//module settings profile
	util: {},		//module general purpose functions
	i18n: {},		//module localized strings
	cache: {},		//module caching system
	geodata: {},	//module geographic data api

	//models
	Place: {},				//class for places
	User: {},				//class for users

	itemsById: {}
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