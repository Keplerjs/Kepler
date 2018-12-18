

Kepler.Place.include({

	poisList: null,

	loadPois: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.poisList)
			cb(self.poisList);
		else
			Meteor.subscribe('poisByPlace', self.id, function() {
				
				self.poisList = K.findPoisByLoc(self.loc).fetch();

				self._dep.changed();

				cb(self.poisList);
			});
	},
	showPois: function(poisType) {
		
		var self = this

		self.loadPois(function(poisList) {

			if(poisList.length) {
				
				var geojsonPois = K.Pois.poisToGeojson(poisList, self, poisType);

				K.Map.addGeojson(geojsonPois, {
					style: K.settings.public.map.styles.pois
				});
			}
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
				type: type,
				count: features.length,
				title: i18n('pois_type_'+type)
			};
		});
	}
});