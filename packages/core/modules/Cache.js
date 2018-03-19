/*
	simple and smart caching system key/value for client and server
*/
//TODO memory cache level.. without use db
//TODO loop to clean expired caches or via api
//TODO store collection in localstorage
//TODO
//if(Meteor.isServer)
//	this._collections[namespace]._ensureIndex({ loc : "2dsphere" });
//	
//TODO
//this._collections[namespace]._createCappedCollection(numBytes);

/**
 * Kepler key/value Caching module
 * @type {Object}
 */
Kepler.Cache = {

	sep: '_',

	prefix: 'cache',
	
	_collections: {},

	_getCollection: function(namespace) {

		namespace = _.isString(namespace) ? this.prefix + this.sep + namespace : this.prefix;

		var opts = {idGeneration: 'STRING'};

		if(Meteor.isClient)
			opts.connection = null;
		
		if(!this._collections[namespace]) {

			this._collections[namespace] = new Mongo.Collection(namespace, opts);
			
			console.log('Cache: new namespace ', namespace);
		}

		return this._collections[namespace];
	},

	_keygen: function(key) {
		key = _.isArray(key) ? key.join(this.sep) : key;
		key = _.isObject(key) ? JSON.stringify(key) : key;
		return key;
	},

	/**
	 * generate future date of expiration
	 * @param  {String} expire 'minutely'|'hourly'|'daily'|'weekly'|'monthly' or seconds number
	 * @return {[type]}        date timestamp
	 */
	_expiregen: function(expire) {

		expire = expire || 'daily';

		var expires = {
			'minutely':60,
			'hourly':  60*60,
			'daily':   60*60*24*1,
			'weekly':  60*60*24*7,
			'monthly': 60*60*24*30,
			'yearly':  60*60*24*30*12
		},
		exp = _.isNumber(expire) ? expire : expires[expire];

		return parseInt( K.Util.time() + exp*1000 );
	},

	set: function(key, val, namespace, expire) {

		var idKey = this._keygen(key);
		
		var set = {val: val};
		
		if(expire)
			set.expire = this._expiregen(expire);

		this._getCollection(namespace).upsert(idKey, {$set: set });
		
		return val;
	},
	get: function(key, namespace, valFunc, expire) {	//if value is not setted it's updated from valFunc

		var idKey = this._keygen(key);

		valFunc = _.isFunction(namespace) ? namespace : valFunc;

		var doc = this._getCollection(namespace).findOne(idKey);

		if(doc && doc.expire && K.Util.time() > doc.expire) {
			this._getCollection(namespace).remove(idKey);
			doc = {val: undefined};
		}

		doc = doc || {val: undefined};
		
		if(_.isFunction(valFunc) && doc.val===undefined)
			doc.val = this.set(idKey, valFunc(key), namespace, expire);

		return doc.val;
	},
	clean: function(namespace) {
		this._getCollection(namespace).remove({});
	}
};
