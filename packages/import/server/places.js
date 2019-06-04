
Meteor.methods({

	importFile: function(fileObj, params, sets) {

		if(!this.userId) return null;

		var importName = params.importname ? K.Util.sanitize.importName(params.importname) : K.Util.timeName(),
			placeIds = [];

		console.log('Import: file', fileObj.name, 'import name', importName);
		//TODO user params as importName
		try {
			var geo = JSON.parse(fileObj.blob);
		}
		catch(err) {
			console.log('Import: error parse json', fileObj.name);
			throw new Meteor.Error(500, i18n('error_import_formatNotValid'));
			return null;
		}

		if(geo && geo.features && geo.features.length>0) {

 			geo.features = _.shuffle( geo.features)

			_.each(geo.features, function(feature, n) {

				if(!feature) return null;

				//TODO check md5 of feature or loc if just imported

				var placeData = K.Import.geojsonToPlace(feature, importName, params),
					placeId = null;
				
				if(placeData) {
					placeId = Meteor.call('importPlace', placeData);
				}
				else {
					console.log('Import: error geojson', n, placeData && placeData.name );
					return null;
				}

				if(placeId) {
					placeIds.push(placeId);
				}
			});

			console.log('Import: places imported ', placeIds.length);
		}
		else if(geo && geo.type && geo.type==='Feature') {

				//TODO check md5 of feature or loc if just imported

				var placeData = K.Import.geojsonToPlace(geo, importName, params),
					placeId = null;
				
				if(placeData) {
					placeId = Meteor.call('importPlace', placeData);
				}
				else {
					console.log('Import: error geojson', n, placeData && placeData.name );
					return null;
				}

				if(placeId) {
					placeIds.push(placeId);
				}
		}
		else
			console.log('Import: error json parse');

		if(placeIds.length>0) {
			Users.update(this.userId, {
				$addToSet: {
					imports: importName
				}
			});
		}

		return placeIds.length+' '+i18n('label_imported');
	},

	importPlace: function(obj) {

		if(!this.userId) return null;

		var place = _.deepExtend({}, K.schemas.place, obj);

		try {
			var placeId = Places.insert(place);
			console.log('Import: importPlace OK', place.name, place.geometry.coordinates.length);
		}
		catch(err) {
			console.log('Import: importPlace Error ', place.name, place.geometry.coordinates.length );
			//console.log(_.omit(place,'geometry','geoinfo'))
			return false;
		}

		return placeId;
	},

	removeImport: function(name) {

		if(!this.userId) return null;

		var count = Places.remove({
			'import.name': name,
			'userId': this.userId
		});
		Users.update(this.userId, {
			$pull: {
				imports: name
			}
		});
		
		console.log('Import: removeImport ', name, this.userId);

		return count;
	}
});