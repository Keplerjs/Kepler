
Template.panelPlaceEdit_edit_info.onRendered(function() {
	
	Autosize( this.$('.input-desc') );
	
	this.$('.input-name').focus();
});

Template.panelPlaceEdit_edit_info.events({
	
	'keydown .input-name': function(e,tmpl) {
		if(e.keyCode===13) {//enter
			e.preventDefault();
			tmpl.$('.btn-rename').trigger('click');
		}
	},
	'click .btn-rename': function(e,tmpl) {
		var place = tmpl.data,
			data = {
				name: tmpl.$('.input-name').val()
			};

		Meteor.call('updatePlace', place.id, data, function(err) {
			place.update();
		});
	},
	'click .btn-renamecanc': function(e,tmpl) {
		tmpl.$('.input-name').val('');
	},

	'keyup .input-url': _.debounce(function(e, tmpl) {
		var place = tmpl.data,
			input$ = $(e.target),
			data = {
				url: input$.val()
			};

		if(data.url.length && !K.Util.valid.url(data.url))
			K.Alert.error( i18n('error_edit_notUrl') );
		else {
			Meteor.call('updatePlace', place.id, data, function(err) {
				place.update();
			});
		}
	}, 500),
	'keydown .input-url': function(e,tmpl) {
		if(e.keyCode===13) {//enter
			e.preventDefault();
			$(e.target).trigger('keyup');
		}
	},
	
	'keyup .input-desc': _.debounce(function(e, tmpl) {
		var place = tmpl.data,
			input$ = $(e.target),
			data = {
				desc: input$.val()
			};

		Meteor.call('updatePlace', place.id, data, function(err) {
			place.update();
		});

	}, 500),
	'keydown .input-desc': function(e,tmpl) {
		if(e.keyCode===13) {//enter
			e.preventDefault();
			$(e.target).trigger('keyup');
		}
	}
});