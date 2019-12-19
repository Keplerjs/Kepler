
Meteor.methods({

	importFile: function(fileObj, params, sets) {

		if(!this.userId) return null;

		var importName = params.importname ? K.Util.sanitize.importName(params.importname) : K.Util.timeName(),
			count = 0;

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

		if(geo && geo.features) {

			_.each(geo.features, function(feature, n) {

				if(!feature) return null;

				if(count > K.settings.public.import.limit) return null;

				//TODO check md5 of feature or loc if just imported

				var placeData = K.Import.geojsonToPlace(feature, importName, params),
					placeId = null;
				
				if(placeData) {
					placeId = Meteor.call('importPlace', placeData);
					if(placeId) count++;
				}
				else {
					console.log('Import: error geojson', n, placeData && placeData.name );
					return null;
				}
			});
		}
		else if(geo && geo.type && geo.type==='Feature') {

				var placeData = K.Import.geojsonToPlace(geo, importName, params),
					placeId = null;
				
				if(placeData) {
					placeId = Meteor.call('importPlace', placeData);
					if(placeId) count++;
				}
				else {
					console.log('Import: error geojson', n, placeData && placeData.name );
					return null;
				}
		}
		else
			console.log('Import: error json parse');

		if(count>0) {
			Users.update(this.userId, {
				$addToSet: {
					imports: importName
				}
			});
		}

		console.log('Import: places imported ', count);

		return count+' '+i18n('label_imported');
	},

	importPlace: function(obj) {

		if(!this.userId) return null;
		
		var place = _.deepExtend({}, K.schemas.place, _.omit(obj,'geometry'));
		//PATCH to don't edit K.schema.places.geometry
		place.geometry = obj.geometry;

		try {
			var placeId = Places.insert(place);
		}
		catch(err) {
			console.log('Import: importPlace Error ', place.name, err);
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