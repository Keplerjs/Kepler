
Kepler.Place.include({

	poisList: null,

	loadPois: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.poisList)
			cb.call(self, K.Pois.poisToGeojson(self.poisList) );
		else
			Meteor.subscribe('poisByPlace', self.id, function() {
				
				self.poisList = K.findPoisByLoc(self.loc).fetch();

				if(!self.poisList.length)
					sAlert.warning(i18n('error_nopoisfound'))

				self._dep.changed();

				cb.call(self, K.Pois.poisToGeojson(self.poisList) );
			});
		return this;
	},

	loadPoisTracks: function(poisGeojson, cb) {
		var self = this;

		var placeLoc = [self.loc[1], self.loc[0]],
			coords = _.map(poisGeojson.features, function(poi) {
				return [placeLoc, poi.geometry.coordinates];
			}),
			tracksGeojson = K.Util.geo.featureColl([
				K.Util.geo.feature('MultiLineString', coords)
			]);

		setTimeout(function() {
			
			cb.call(self, tracksGeojson);

		},100);
		
		return this;
	},
	
	showPois: function(poisType) {
		
		var self = this

		self.loadPois(function(poisGeojson) {

			if(poisType) {
				poisGeojson.features = _.filter(poisGeojson.features, function(f) {
					return K.Pois.typeByTags(f.properties.tags) === poisType;
				});
			}
			
			K.Map.addGeojson(poisGeojson, {
				label: i18n('btn_pois'),
				clear: true,
				//noFitBounds: true,//fitbound only the tracks
				style: K.settings.public.map.styles.pois
			}, function() {
				self.loadPoisTracks(poisGeojson, function(tracksGeojson) {

					K.Map.addGeojson(tracksGeojson, {
						clear: false,
						//noFitBounds: true,
						style: K.settings.public.map.styles.pois
					});
				});
			});
		});
	},
	getPoisList: function() {

		var self = this;

		self._dep.depend();

		var featuresByType = _.groupBy(self.poisList, function(feature) {				
				return K.Pois.typeByTags(feature.properties.tags);
			});

		return _.map(featuresByType, function(features, type) {
			return {
				placeId: self.id,
				type: type,
				count: features.length,
				title: i18n('pois_type_'+type)
			};
		});
	}
});