/*
	class Place with POIs support
*/
Climbo.Place.include({

	cache: {
		pois: null
	},

	loadPois: function(tipo,show) {

		var self = this;
		
		show = _.isUndefined(show) ? true : false;

		function addPoiPlace(pois, loc, tipo) {
			
			if(tipo) {
				pois = _.filter(pois, function(poi) {
					return poi.properties.tipo===tipo;
				});
			}

			var loc = [loc[1], loc[0]],
				poiPlace = Climbo.util.geo.createFeature('Point', loc, {tipo:'place'});
				coordLines = _.map(pois, function(poi) {
					return [loc, poi.geometry.coordinates];
				}),
				poiLines = Climbo.util.geo.createFeature('MultiLineString', coordLines, {tipo:'poiline'});

			return Climbo.util.geo.createFeatureColl(_.union(pois, poiPlace, poiLines));
		}

		if( self.pois && self.cache.pois && show) 
			Climbo.map.loadGeojson( addPoiPlace(self.cache.pois, self.loc, tipo) );
		else
			Meteor.call('getPoisByLoc', self.loc, function(err, pois) {
				
				if(pois && pois.length>0)
				{
					self.cache.pois = pois;
					self.update();
					if(show)	
						Climbo.map.loadGeojson( addPoiPlace(pois, self.loc, tipo) );
				}
				else
					self.cache.pois = 0;
			});
	}
});