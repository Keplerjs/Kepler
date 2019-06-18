
Template.panelPlaceEdit.onRendered(function() {
	
	var self = this,
		place = this.data;

	self.$('.btn-editdel').btsConfirmButton(function(e) {

		Meteor.call('removePlace', place.id, function(err) {

			if(err)
				console.warn(err.message);
			else
			{
				K.Map.removeItem(K.placeById(place.id));
			
				Router.go('root');
			}
		});
	});

	Autosize( self.$('.input-desc') );

});

Template.panelPlaceEdit.events({
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
			K.Alert.error( i18n('edit_error_notUrl') );
		else {
			Meteor.call('updatePlace', place.id, data, function(err) {
				place.update();
			});
		}
	}, 300),
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
				desc: _.str.trim(input$.val())
			};

		Meteor.call('updatePlace', place.id, data, function(err) {
			place.update();
		});

	}, 300),
	'keydown .input-desc': function(e,tmpl) {
		if(e.keyCode===13) {//enter
			e.preventDefault();
			$(e.target).trigger('keyup');
		}
	}
});

Template.tabUser_edit.events({
	'click .panel-btn-placesList': function(e, tmpl) {

		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');
		
		this.loadPlaces(function() {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});
