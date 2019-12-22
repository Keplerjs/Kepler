
Template.panelImport_file.onCreated(function() {

    this.importName = new ReactiveVar(K.Util.timeName());

    this.importCount = new ReactiveVar(0);

});

Template.panelImport_file.helpers({
	importCount: function() {
		var tmpl = Template.instance();
		return tmpl.importCount.get();
	},
	importGetParams: function() {
		var tmpl = Template.instance();
		return {
			importname: tmpl.importName.get()
		};
	},
	importOnSelect: function() {
		var tmpl = Template.instance();
		return function(err, fileObj, params) {
			var name$ = tmpl.$('.import-name'),
				importName = K.Util.sanitize.importName(fileObj.name);
			
			tmpl.fileObj = fileObj;

			name$.val( importName );
			tmpl.importName.set(importName);
		}
	},
	importOnUploaded: function() {
		var tmpl = Template.instance();
		return function(err, msg) {
			K.Map.cleanGeojson();
			if(err)
				K.Alert.success(err);
			else if(msg)
				K.Alert.success(msg);
		}
	}
});

Template.panelImport_file.events({
	'keydown .import-name': _.debounce(function(e, tmpl) {
		var name$ = tmpl.$('.import-name'),
			importName = K.Util.sanitize.importName(name$.val());
		
		name$.val(importName);
		tmpl.importName.set(importName);
	},300),
	'click .import-preview': function(e, tmpl) {
		
		if(!tmpl.fileObj) return;

		var geo = JSON.parse(tmpl.fileObj.blob);

		tmpl.importCount.set(geo.features.length);

		var maxFeatures = 10,
			sample = _.first(_.shuffle(geo.features), maxFeatures);

		K.Map.addGeojson({features: sample});

		_.each(sample, function(f,n) {
				
			let cen = K.Util.geo.centroid(f.geometry),
				icon = new L.NodeIcon({
					//TODO className: 'marker-blue'
				}),
				marker = L.marker(cen, {
					icon: icon
				});

			marker.addTo(K.Map.layers.geojson);
			
			Blaze.renderWithData(Template.markerPlace, f.properties, icon.nodeHtml);				
			
		});
	}
});
