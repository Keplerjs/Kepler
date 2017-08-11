

Kepler.Place.include({

	poisList: null,

	typeByTags: function(tags) {
		var type, val;
		for(var tag in tags) {
			val = tags[tag];
			type = K.settings.public.pois.typesByTags[tag+'='+val];
			if(type)
				return type;
		}
		return type;
	},

	loadPois: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.poisList)
			cb(self.poisList);
		else
			Meteor.subscribe('poisByPlace', self.id, function() {
				
				self.poisList = findPoisByLoc(self.loc).fetch();

				self._dep.changed();

				cb(self.poisList);
			});
	},
	showPois: function(poisType) {
		
		var self = this

		self.loadPois(function(poisList) {

			if(poisList.length) {
				
				var geojsonPois = self.poisToGeojson(poisList, self, poisType);

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
				return self.typeByTags(feature.properties.tags);
			});

		return _.map(featuresByType, function(features, type) {
			return {
				type: type,
				icon: 'icon icon-'+type,
				count: features.length,
				title: i18n('pois_type_'+type)
			};
		});
	},
	poisToGeojson: function(features, place, poisType) {
		//decorate Poi markers with place circle and lines from place to pois
		
		var self = this;

		if(poisType) {
			features = _.filter(features, function(feature) {
				return self.typeByTags(feature.properties.tags) === poisType;
			});
		}

		features = _.map(features, function(feature) {
			feature.templatePopup = 'popupGeojson_pois';
			return feature;
		});

		var placeLoc = [place.loc[1], place.loc[0]],
			coordLines = _.map(features, function(poi) {
				return [placeLoc, poi.geometry.coordinates];
			}),
			poiLines = K.Util.geo.createFeature('MultiLineString', coordLines);

		return K.Util.geo.createFeatureColl(_.union(features, poiLines));
	}
});