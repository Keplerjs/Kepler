/*
	sistema di caching key/value su mongodb
	per calcolo di valori weather, aspect, elevazioni da coordinate
	e altre cose che richiedono chiamate http remote
*/

//TODO _ensureIndex
// TODO usare collection mongo di tipi capped:
// http://docs.mongodb.org/manual/core/capped-collections/

/*var Caches = {
	elevation: new Meteor.Collection('cache_elevation', {idGeneration:'STRING'}),
	provincia: new Meteor.Collection('cache_provincia', {idGeneration:'STRING'}),
	nazione:  new Meteor.Collection('cache_nazione', {idGeneration:'STRING'}),
	regione: new Meteor.Collection('cache_regione', {idGeneration:'STRING'}),
	comune: new Meteor.Collection('cache_comune', {idGeneration:'STRING'}),
	aspect: new Meteor.Collection('cache_aspect', {idGeneration:'STRING'}),	
	weather: new Meteor.Collection('cache_weather', {idGeneration:'STRING'}),
	near: new Meteor.Collection('cache_near', {idGeneration:'STRING'})	
};*/

Kepler.cache = {
	_getCollection: function(name) {
		return new Meteor.Collection('cache_'+name, {idGeneration:'STRING'});
	},
	set: function(funcname, key, val) {
		
		K.cache._getCollection(funcname).upsert(key, {$set: {val: val} });
		
		return val;
	},
	get: function(funcname, key) {

		var cache = K.cache._getCollection(funcname).findOne(key) || {val: null};

		return cache.val;
	}
};
