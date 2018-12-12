/*
 * Class powers the OOP facilities of the library.
 * Thanks to John Resig and Dean Edwards for inspiration!
 * 
 * //TODO https://github.com/jeromeetienne/microevent.js/blob/master/package.json
 */
function extend(dest) {
	var i, j, len, src;

	for (j = 1, len = arguments.length; j < len; j++) {
		src = arguments[j];
		for (i in src) {
			dest[i] = src[i];
		}
	}
	return dest;
}

Class = function(){};
Class.extend = function (props) {

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
	extend(proto, props);

	var parent = this;
	// jshint camelcase: false
	NewClass.__super__ = parent.prototype;

	return NewClass;
};

Class.include = function (props) {
	extend(this.prototype, props);
};

//TODO https://github.com/scottcorgan/tiny-emitter

//TODO include https://github.com/jeromeetienne/microevent.js/blob/master/package.json




