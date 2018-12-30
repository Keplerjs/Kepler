
Template.panelPlaceEdit.onRendered(function() {
	var self = this;
	
	self.$('.btn-editdel').btsConfirmButton(function(e) {

		Meteor.call('removePlace', self.data.id, function(err) {

			if(err)
				console.warn(err.message);
			else
			{
				K.Map.removeItem(K.placeById(self.data.id));
			
				Router.go('root');
			}
		});
	});
});

Template.panelPlaceEdit.events({
	'click .btn-editren': function(e,tmpl) {
		var place = tmpl.data,
			data = {
				name: tmpl.$('.input-editren').val()
			};

		Meteor.call('updatePlace', place.id, data, function(err) {
			place.update();
		});
	},
	'keydown .input-editren': function(e,tmpl) {
		if(e.keyCode===13) {//enter
			e.preventDefault();
			tmpl.$('.btn-editren').trigger('click');
		}
	},
	'click .btn-cancelren': function(e,tmpl) {
		tmpl.$('.input-editren').val('');
	},

	'keyup .input-url': _.debounce(function(e, tmpl) {
		var place = tmpl.data,
			input$ = $(e.target),
			data = {
				url: input$.val()
			};

		if(data.url.length && !K.Util.valid.url(data.url))
			sAlert.error( i18n('edit_error_notUrl') );
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
