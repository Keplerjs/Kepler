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
			if(tipo)
				pois = _.filter(pois, function(poi) {
					return poi.properties.tipo===tipo;
				});
			var poiPlace = Climbo.util.geo.createFeature('Point', {tipo:'place'}, [loc[1],loc[0]]);
			return Climbo.util.geo.createFeatureColl(_.union(pois,poiPlace));
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