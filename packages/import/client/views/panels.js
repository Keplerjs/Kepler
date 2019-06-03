
Template.formImport.onCreated(function() {

    this.importName = new ReactiveVar('');

});

Template.formImport.helpers({
	importParams: function() {
		var tmpl = Template.instance();
		return {
			importname: tmpl.importName.get()
		};
	},
	importOnSelect: function() {
		var tmpl = Template.instance();
		return function(err, fileObj, params) {
			var name$ = tmpl.$('.import-name'),
				importName =  K.Util.sanitize.importName(fileObj.name);
			
			var geoj = JSON.parse(fileObj.blob);

			var n=0, maxFeatures = 10,
				sample = _.first(_.shuffle(geoj.features), maxFeatures);

			K.Map.addGeojson({features: sample});

			_.each(sample, function(f) {
				
				let cen = K.Util.geo.centroid(f.geometry),
					icon = new L.NodeIcon(),
					marker = L.marker(cen, {icon: icon});

				marker.addTo(K.Map.layers.geojson);
				
				Blaze.renderWithData(Template.markerPlace, f.properties, icon.nodeHtml);
				n++;
			});

			K.Alert.info(i18n('label_importpreview',n,geoj.features.length));

			name$.val( importName );
		}
	},
	importOnUploaded: function() {
		var tmpl = Template.instance();
		return function(ret, fileObj, params) {
			K.Map.cleanGeojson();
			K.Alert.info(ret);
		}
	}
});

Template.formImport.events({
	'keydown .import-name': _.debounce(function(e, tmpl) {
		console.log(e.target.value)
		var importName = K.Util.sanitize.importName(e.target.value);
		
		$(e.target).val(importName);

		tmpl.importName.set(importName)
	},300)
});
