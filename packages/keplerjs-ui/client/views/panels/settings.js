
Template.panelSettings.helpers({
	genders: function() {
		var gender = Meteor.user() && (Meteor.user().gender || 'none');
		return _.map({male:'male',female:'female',none:'none'}, function(val, k) {
			return {
				key: k,
				val: val,
				name: i18n('gender_'+k),
				active: gender===val
			};
		});
	},
	lang: function() {
		return K.settings.public.langs[K.Profile.data.lang] ? K.Profile.data.lang : K.settings.public.lang;
	},
	langs: function() {
		return _.map(K.settings.public.langs, function(v,k) {
			return {
				key: k,
				val: v,
				active: k===K.Profile.data.lang
			};
		});
	},
	layers: function() {
		var layer = K.Profile.getOpts('map.layer') || K.settings.public.map.layer;
		return _.map(K.settings.public.map.layers, function(val, k) {
			return {
				key: k,
				val: k,
				name: i18n('map_layer_'+k),
				active: k===layer,
				url: _.template(val,{s:'a',z:'15',x:'17374',y:'11667'})
			};
		});
	},
	mapcenter: function() {
		var z = K.Profile.getOpts('map.zoom');
		return K.Util.humanize.loc(K.Profile.getOpts('map.center'))+(z?','+z:'');
	},
	version: function() {
		return K.version;
	}
});

Template.panelSettings.events({

	'keyup #username': _.debounce(function(e, tmpl) {
		var input$ = $(e.target),
			feed$ = input$.siblings('.form-control-feedback'),
			mes$ = input$.siblings('label'),
			val = input$.val();
		
		if(val.length < 3) {
			input$.val( tmpl.data.username );
			mes$.html(i18n('error_validchars'));
			return null;
		}

		feed$.show().addClass('icon-loader');

		Meteor.call('setUsername', val, function(err, sanitized) {

			feed$.hide().removeClass('icon-loader');
			
			if(err) {
				mes$.html(err.reason)
				input$.val( tmpl.data.username );
			}
			else {
				input$.val(sanitized);
				mes$.html('');
				feed$.show();
			}
		});

	}, 2000),

	'blur #username': function(e, tmpl) {
		$(e.target).val( tmpl.data.username );
	},

	'keyup #name': _.debounce(function(e) {
		var feed$ = $(e.target).next('.form-control-feedback'),
			val = $(e.currentTarget).val();
		if(!K.Util.valid.name(val)) {
			feed$.show();
		}
		else {
			feed$.hide();
			Users.update(Meteor.userId(), { $set: {'name': val } });
		}
	}, 300),

/*	'keyup #city': _.debounce(function(e) {
		var val = $(e.currentTarget).val();
		Users.update(Meteor.userId(), { $set: {'city': val } });
	}, 300),*/
	
	'change #maplayer input': _.debounce(function(e) {
		e.preventDefault();

		var val = $(e.currentTarget).val();
		
		Users.update(Meteor.userId(), { $set: {'settings.map.layer': val } });

		K.Map.setOpts({layer: val });

	}, 300),

	'click #mapcenter .btn-mapcenter': _.debounce(function(e) {
		e.preventDefault();

		var input$ = $(e.currentTarget).parents('#mapcenter').find('input'),
			cen = K.Map.getCursorLoc() || K.Map.getCenter(),
			zom = K.Map.map.getZoom(),
			val = K.Util.geo.roundLoc(cen);
		
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

	'change #gender input': _.debounce(function(e) {
		e.preventDefault();

		var val = $(e.currentTarget).val();
		Users.update(Meteor.userId(), { $set: {'gender': val } });

	}, 300),

	'change #lang': function(e) {
		e.preventDefault();

		var lang = $(e.currentTarget).val();

		Users.update(Meteor.userId(), { $set: {'lang': lang} });

		i18n.setLanguage(lang);
	},
	/*
	//TODO
	'keyup #email': _.debounce(function(e) {
		var val = $(e.target).val(),
			oldval = $(e.target).data('value'),
			feed$ = $(e.target).next('.form-control-feedback');

		if(!K.Util.valid.email(val))
			feed$.show();
		else {
			feed$.hide();
			//TODO
			// Users.update(Meteor.userId(), {
			// 	$set: {
			// 		emails: [{
			// 			address: val,
			// 			verified: val==oldval
			// 		}]
			// 	}
			// });
		}
	}, 300),
	*/	
});

Template.item_user_blocked.events({
	'click .user-btn-unblock': function(e, tmpl) {
		K.Profile.userUnblock(this.id);
	}
});
