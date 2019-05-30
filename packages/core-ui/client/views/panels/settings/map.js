
Template.panelSettings_ui_map.helpers({
	
	layers: function() {
		
		var layer = K.Profile.getOpts('map.layer') || K.settings.public.map.layer,
			layers = [];

		_.each(K.settings.public.map.layers, function(v,k) {
			console.log(v,k)
			if(!!v && _.isString(v)) {
				layers.push({
					key: k,
					val: k,
					name: i18n('map_layer_'+k) || k,
					active: k===layer,
					url: K.Util.tmpl(v,{s:'a',z:'15',x:'17374',y:'11667'})
				});
			}
		});
		return layers;
	},
	mapcenter: function() {
		var z = K.Profile.getOpts('map.zoom');
		return K.Util.humanize.loc(K.Profile.getOpts('map.center'))+(z?','+z:'');
	}
});

Template.panelSettings_ui_map.events({
	
	'change #maplayer input': _.debounce(function(e) {
		e.preventDefault();

		var val = $(e.currentTarget).val();
		
		Users.update(Meteor.userId(), {
			$set: {
				'settings.map.layer': val
			}
		});

		K.Map.setOpts({layer: val });

	}, 300),

	'click #mapcenter .btn-mapcenter': _.debounce(function(e) {
		e.preventDefault();

		var input$ = $(e.currentTarget).parents('#mapcenter').find('input'),
			cen = K.Map.getCursorLoc() || K.Map.getCenter(),
			zom = K.Map.map.getZoom(),
			val = K.Util.geo.locRound(cen);
		
		input$.val(K.Util.humanize.loc(val)+','+zom);
		
		Users.update(Meteor.userId(), {
			$set: {
				'settings.map.center': val,
				'settings.map.zoom': zom
			}
		});
	}, 300),

	'click #mapcenter .btn-mapcancel': _.debounce(function(e) {
		e.preventDefault();

		var input$ = $(e.currentTarget).parents('#mapcenter').find('input');
		
		input$.val('');
		
		Users.update(Meteor.userId(), {
			$set: {
				'settings.map.center': null,
				'settings.map.zoom': null
			}
		});
	}, 300),

});
