
//TODO Osms = new Mongo.Collection('osm');

var tags2poiClass = {
'amenity=drinking_water': 'water',
'amenity=parking': 'parking',
'amenity=restaurant': 'eat',
'tourism=camp_site': 'camp',
'amenity=hospital': 'bed',
'tourism=hotel': 'bed',
'amenity=bar': 'drink'
};

//'highway=path',

Kepler.osm = {
	
	iconByTags: function(tags) {
		for(var tag in tags) {
			var tagval = tag+'='+tags[tag];

			if(tags2poiClass[tagval])
				return 'icon icon-'+tags2poiClass[tagval];
		}
		return '';
	},

	loadQuery: function(filter) {

		filter = filter || 'amenity=bar';

		var bbox = K.Map.getBBox();
		
		Meteor.call('getOsmByBBox', filter, bbox, function(err, geojson) {
			
			//console.log('getOsmByBBox',geojson.features.length);

			if(geojson.features.length)
				K.Map.loadGeojson(geojson);
		});
	},

	loadTracks: function() {
		Meteor.call('getOsmByBBox', 'highway=track', K.Map.getBBox(), 'way', function(err, geojson) {
			
			console.log(geojson);

			if(geojson.features.length>0)
				K.Map.loadGeojson(geojson);
		});
	}	
};

/*
	pointToLayer: function(feature, latlng) {	//costruisce marker POI

		if(feature.properties.type==='placeCircle')	//evidenzia place nei pois
			return new L.CircleMarker(latlng);

//TODO move to osm plugins extending K.Place
/*		else if(feature.properties.tags)			//OSM point
		{

			var iconPoi = L.DomUtil.create('div'),
				iconClass = K.osm.iconByTags(feature.properties.tags);

			L.DomUtil.create('i', iconClass, iconPoi);
			return new L.Marker(latlng, {
					icon: new L.NodeIcon({className:'marker-poi', nodeHtml: iconPoi})
				});
		}*/