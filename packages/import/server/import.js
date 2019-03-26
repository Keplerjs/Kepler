
var geojsonToPlace = function(feature, importName) {

	var prop = feature.properties,
		coords = feature.geometry.coordinates;

	var name = prop.name || '';

	_.each(prop, function(v, k) {
		if(!v) {
			delete prop[k];
		}
	});

	if(feature.geometry.type==='Point') {
		return {
			name: K.Util.sanitize.name(name),
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

	removeImport: function(name) {

		if(!this.userId) return null;

		var c= Places.remove({
			'import.name': name,
			'userId': this.userId
		});
		Users.update(this.userId, {
			$pull: {
				imports: name
			}
		});
		console.log('Import: removeImport ', name, this.userId);
		return c;
	},

	importPlace: function(obj) {

		if(!this.userId) return null;

		var place = _.deepExtend({}, K.schemas.place, obj);

		var placeId = Places.insert(place);

		console.log('Import: importPlace ', place.name || placeId);

		return placeId;
	},

	importFile: function(fileObj, params) {

		if(!this.userId) return null;

		var geo = JSON.parse(fileObj.blob),
			importName = K.Util.sanitize.fileName(fileObj.name, true) || K.Util.timeName(),
			placeIds = [];

		//TODO user params as importName
		
		console.log('Import: file ', fileObj.name);

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

		Users.update(this.userId, {
			$addToSet: {
				imports: importName
			}
		});

		return placeIds.length+' '+i18n('label_imported');
	}
});