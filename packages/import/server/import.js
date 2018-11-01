
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

	importFile: function(fileObj, target) {

		if(!this.userId) return null;

		var geo = JSON.parse(fileObj.blob),
			importName = fileObj.name || K.Util.timeName(),
			placeIds = [];

		if(fileObj.size > K.settings.public.import.maxFileSize) {
			
			console.log('Import: error ', _.omit(fileObj,'blob') );

			throw new Meteor.Error(500, i18n('error_import_formatNotValid') + K.Util.humanize.filesize(K.settings.public.import.maxFileSize) );
		}

		console.log('Import: ', fileObj.name, K.Util.humanize.filesize(fileObj.size))

		//TODO import geojson in a cache collection 
		
		if(geo && geo.features && geo.features.length>0) {

			_.each(geo.features, function(feature) {

				if(!feature) return null;

				//TODO check md5 of feature or loc if just imported

				var placeData = geojsonToPlace(feature, importName),
					placeId = null;
				
				if(placeData) {
					
					//insertPlace() from edit plugin
					placeId = Meteor.call('insertPlace', placeData);
					
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