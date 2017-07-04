
Kepler.Place.include({

	poisList: null,
	
	loadPois: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.poisList)
			cb(self.poisList);
		else
			Meteor.subscribe('poisByPlace', self.id, function() {
				
				self.poisList = getPoisByLoc(self.loc).fetch();

				self._dep.changed();

				cb(self.poisList);
			});
	},
	showPois: function(poisType) {
		
		var self = this;

		self.loadPois(function(poisList) {
			K.Map.loadGeojson( poisToGeojson(poisList, self, poisType) );
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
				title: i18n('pois.'+type)
			};
		});
	}
});