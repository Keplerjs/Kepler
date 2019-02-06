//TODO https://github.com/jeromeetienne/microevent.js/blob/master/package.json

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
/**
 * Class powers the OOP facilities of the library.
 * Thanks to John Resig and Dean Edwards for inspiration!
 * @class
 */
Class = function(){};
/**
 * Extends the current class given the properties to be included.
 * @param  {Object} props properties of new class
 * @return {Object}       Returns a Javascript function that is a class constructor (to be called with `new`).
 */
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

	/**
	 * parent prototype
	 * @type {Function}
	 */
	NewClass.__super__ = parent.prototype;

	return NewClass;
};
/**
 * Includes a mixin into the current class.
 * @param  {Object} props properties/methods include in this class
 */
Class.include = function (props) {
	extend(this.prototype, props);
};

//TODO https://github.com/scottcorgan/tiny-emitter

//TODO include https://github.com/jeromeetienne/microevent.js/blob/master/package.json




