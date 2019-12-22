
/* OSM geojson data structure
{
   "type":"Feature",
   "id":"node/3517622759",
   "properties":{
      "type":"node",
      "id":3517622759,
      "tags":{
         "amenity":"restaurant",
      },
      "relations":[],
      "meta":{}
   },
   "geometry":{
      "type":"Point",
      "coordinates":[12.5123636,41.8814402]
   }
}
*/

var Future = Npm.require('fibers/future'),
	Overpass = Npm.require('query-overpass');

Kepler.Osm = {

	osmToPlace: function(feature) {

		var tags = feature.properties.tags,
			geom = feature.geometry,
			loc = K.Util.geo.centroid(geom);

		//TODO in settings delete feature.geometry;

		var place = {
			loc: loc,
			geometry: geom,
			osm: feature,
			source: {
				type: 'osm'
			}
		};

		if(tags.name)
			place.name = K.Util.sanitize.name(tags.name);

		if(tags.description)
			place.desc = K.Util.sanitize.text(tags.description);

		if(tags.website)
			place.url = K.Util.sanitize.url(tags.website);
		else if(tags['contact:website'])
			place.url = K.Util.sanitize.url(tags['contact:website']);
		
		return place;
	},

	overpassSync: function(query) {

		//TODO here implement caching system

		var future = new Future();

		Overpass(query, function(err, resp) {
			
			if(err) {
				console.log('Osm: overpass error', err.message)
				future.throw(err);
			}
			else
				future.return(resp); 
			
		}, K.settings.osm.overpass);

		return future.wait();
	},

	findByLoc: function(loc, opts) {
		
		var query = this.queryBuilder(opts, loc);

		var geojson = this.overpassSync(query),
			features = geojson.features;
		
		for(var f in features) {
			if( features[f] && features[f].properties) {
				
				if(opts.meta!==true && features[f].properties.meta)
					delete features[f].properties.meta;
				
				if(!_.contains(opts.types,'rel') && features[f].properties.relations)
					delete features[f].properties.relations;
			}
		}
		
		console.log('Osm: findByLoc', loc);

		return geojson;
	},

	findById: function(osmId) {

		var query = this.queryBuilder({id: osmId}),
			geojson = this.overpassSync(query);

		console.log('Osm: findOsmById', osmId);

		return _.first(geojson.features);
	}
};

Meteor.methods({
	findOsmByLoc: function(loc, opts) {
		
		if(!this.userId) return null;

		return K.Osm.findByLoc(loc, opts);
	},
	findOsmById: function(osmId) {
		
		if(!this.userId) return null;
		
		return K.Osm.findById(osmId);
	},
	findOsmByQuery: function(query) {
		
		if(!this.userId) return null;

		var i = '[out:json];';
		query = query.startsWith(i) ? query : i+query;
		//TODO sanitize query string

		console.log("Osm: findOsmByQuery...\n", query);

		var ret = K.Osm.overpassSync(query);

		console.log('Osm: findOsmByQuery features', _.size(ret.features));

		return ret;
	}
});
