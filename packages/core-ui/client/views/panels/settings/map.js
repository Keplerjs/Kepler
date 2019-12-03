
Template.panelSettings_ui_map.helpers({
	
	layers: function() {
		
		var layer = K.Profile.getOpts('map.layer') || K.settings.public.map.layer,
			layers = [];

		_.each(K.settings.public.map.layers, function(v,k) {
			
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
			//cur = K.Map.getCursorLoc(),
			ll = K.Map.map.getCenter(),
			cen = K.Map.isVisible() ? K.Map.getCenter() : [ll.lat,ll.lng],
			zom = K.Map.map.getZoom(),
			loc = K.Util.geo.locRound(cen);
		
		input$.val(K.Util.humanize.loc(loc)+','+zom);
		
		Users.update(Meteor.userId(), {
			$set: {
				'settings.map.center': loc,
				'settings.map.zoom': zom
			}
		});

		//K.Alert.info(i18n('label_mapcentermap'));

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
