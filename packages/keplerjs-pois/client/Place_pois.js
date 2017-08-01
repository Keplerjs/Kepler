
Kepler.Place.include({

	poisList: null,
	
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
			K.Map.addGeojson(self.poisToGeojson(poisList, self, poisType), {
				style: K.settings.public.map.styles.pois
			});
		});
	},	
	getPoisList: function() {

		this._dep.depend();

		var types = _.countBy(this.poisList, function(feature) {
				return feature.properties.type;
			});

		return _.map(types, function(val, type) {
			return {
				type: type,
				count: val,
				title: i18n('pois_type_'+type)
			};
		});
	},
	poisToGeojson: function(pois, place, poisType) {
		//decorate Poi markers with place circle and lines from place to pois

		if(poisType) {
			pois = _.filter(pois, function(feature) {
				return feature.properties.type === poisType;
			});
		}

		pois = _.map(pois, function(feature) {
			feature.templatePopup = 'popupGeojson_pois';
			return feature;
		});

		var gloc = [place.loc[1], place.loc[0]],
			coordLines = _.map(pois, function(poi) {
				return [gloc, poi.geometry.coordinates];
			}),
			poiLines = K.Util.geo.createFeature('MultiLineString', coordLines, {type:'poiLine'}),
			features = _.union(pois, poiLines);

		return K.Util.geo.createFeatureColl(features);
	}
});