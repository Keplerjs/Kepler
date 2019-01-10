
Template.panelSettings_ui_bio.events({

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
				input$.val( err.details || tmpl.data.username );
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
	
	'change #gender input': _.debounce(function(e) {
		e.preventDefault();

		var val = $(e.currentTarget).val();
		Users.update(Meteor.userId(), { $set: {'gender': val } });

	}, 300)

});

Template.panelSettings_ui_bio.helpers({
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
	}
});
