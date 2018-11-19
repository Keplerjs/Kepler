
var geojsonToPlace = function(feature, importName) {

	var prop = feature.properties,
		coords = feature.geometry.coordinates;

	var name = prop.name || '';//K.Util.timeName('obj '+prop.id)

	_.each(prop, function(v, k) {
		if(!v) {
			delete prop[k];
		}
	});

	if(feature.geometry.type==='Point') {
		return {
			name: name, //K.Util.sanitize.name(name),
			loc: [coords[1], coords[0]],
			active: 0,
			import: {
				name: importName,
				data: feature
			},
			source: {
				type: 'import'
			}
		};
	}
	else {
		console.log('Import: error geometry not a Point', feature.geometry.type );
		return null;
	}
};


Meteor.methods({

	importPlace: function(obj) {

		if(!this.userId) return null;

		var place = _.deepExtend({}, K.schemas.place, obj);

		var placeId = Places.insert(place);

		console.log('Import: importPlace ', place.name || placeId);

		return placeId;
	},

	importFile: function(fileObj, sets) {

		if(!this.userId) return null;

		var geo = JSON.parse(fileObj.blob),
			importName = fileObj.name || K.Util.timeName(),
			placeIds = [];

		console.log('Import: file ', fileObj.name);

	return ['ciao','bau','miao'];

		if(geo && geo.features && geo.features.length>0) {

			_.each(geo.features, function(feature) {

				if(!feature) return null;

				//TODO check md5 of feature or loc if just imported

				var placeData = geojsonToPlace(feature, importName),
					placeId = null;
				
				if(placeData) {
					
					//insertPlace() from edit plugin
					placeId = Meteor.call('importPlace', placeData);
					
					//console.log('Import: insertPlaceByImport ', placeId);
				}

				if(placeId) {
					placeIds.push(placeId);
				}
			});

			console.log('Import: places imported ', placeIds.length);
		}
		else
			console.log('Import: error json parse');

		return placeIds;
	}
});