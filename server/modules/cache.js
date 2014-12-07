/*
	sistema di caching key/value su mongodb
	per calcolo di valori weather, aspect, elevazioni da coordinate
	e altre cose che richiedono chiamate http remote
*/

//TODO _ensureIndex
// TODO usare collection mongo di tipi capped:
// http://docs.mongodb.org/manual/core/capped-collections/


Caches = {
	elevation: new Meteor.Collection('cache_elevation', {idGeneration:'STRING'}),
	provincia: new Meteor.Collection('cache_provincia', {idGeneration:'STRING'}),
	nazione:  new Meteor.Collection('cache_nazione', {idGeneration:'STRING'}),
	regione: new Meteor.Collection('cache_regione', {idGeneration:'STRING'}),
	comune: new Meteor.Collection('cache_comune', {idGeneration:'STRING'}),
	aspect: new Meteor.Collection('cache_aspect', {idGeneration:'STRING'}),	
	weather: new Meteor.Collection('cache_weather', {idGeneration:'STRING'}),
	near: new Meteor.Collection('cache_near', {idGeneration:'STRING'})	
};

Climbo.cache = {
	set: function(funcname, key, val) {
		
		if(Caches[funcname])
			Caches[funcname].upsert(key, {$set: {val: val} });
		
		//console.log('Climbo.cache.set() ',funcname,key,val);

		return val;
	},
	get: function(funcname, key) {

		if(_.isUndefined(Caches[funcname])) return null;

		var cache = Caches[funcname].findOne(key) || {val:null};

		//console.log('Climbo.cache.get() ',funcname,key, cache.val);

		return cache.val;
	}
};
