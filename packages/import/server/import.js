
var importToPlace = function(f) {

	var prop = f.properties,
		coords = f.geometry.coordinates;

	var name = prop.name || '';//K.Util.timeName('obj '+prop.id)
	
	if(f.geometry.type==='Point') {
		return {
			name: name, //K.Util.sanitize.name(name),
			loc: [coords[1], coords[0]],
			active: 0,
			import: f,
			source: {
				type: 'import'
			}
		};
	}
	else
		return null;
};


Meteor.methods({

	insertPlaceByImport: function(obj) {

		if(!this.userId) return null;
		
		if(!obj) return null;

		//TODO check md5 of obj or loc if just imported

		var placeData = importToPlace(obj),
			placeId = null;
		
		if(placeData) {
			
			//insertPlace() from edit plugin
			placeId = Meteor.call('insertPlace', placeData);
			
			console.log('Import: insertPlaceByImport ', placeId);
		}
		else
			console.log('Import: error format ', placeData);


		return placeId;
	},

	importFile: function(fileObj, target) {

		if(!this.userId) return null;

		var geo = JSON.parse(fileObj.blob),
			placeIds = [];

		if(fileObj.size > K.settings.public.import.maxFileSize) {
			
			console.log('Import: error ', _.omit(fileObj,'blob') );

			throw new Meteor.Error(500, i18n('upload_error_imageNotValid') + K.Util.humanize.filesize(K.settings.public.import.maxFileSize) );
			i18n('error_import_formatNotValid')
		}

		console.log('Import: ', fileObj.name, K.Util.humanize.filesize(fileObj.size))

		//TODO import geojson in a cache collection 
		
		if(geo && geo.features && geo.features.length>0) {

			_.each(geo.features, function(f) {

				var placeId = Meteor.call('insertPlaceByImport', f);

				if(placeId)
					placeIds.push(placeId);
			});

			console.log('Import: places imported ', placeIds.length);
		}
		else
			console.log('Import: error json parse');

		return placeIds;
	}
});