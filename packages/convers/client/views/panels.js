
Template.converInput.onRendered(function() {
	Autosize( this.find('textarea') );
});

Template.converInput.events({
	'keydown textarea': function(e,tmpl) {
		if(e.keyCode===13)//enter
		{
			e.preventDefault();
			var text$ = tmpl.$('textarea');			
			
			K.Conver.insertMsgToConver(this._id, text$.val() );

			text$.val('').height('auto');
		}
	}
});

Template.converMsgs.helpers({
	msgsMore: function() {
		return [];
	},
	msgsLast: function() {

			//TODO refactoring with new API

			var tmpl = Template.instance(),
				list$ = $(tmpl.firstNode).parents('.panel-body');
			
			list$.scrollTop( list$.prop('scrollHeight') );

			return K.findMsgsByConver( Template.currentData()._id );
	}
});

Template.converMsgs.events({
	'click .conver-btn-more': function(e,tmpl) {
		e.preventDefault();
		$(e.target).prev().slideToggle();
	}
});


Template.conver_place_new.events({
	'click .conver-btn-new': function(e,tmpl) {
		e.preventDefault();
		
		var title = _.str.clean(tmpl.$('.conver-title-new').val());
		
		if(!_.str.isBlank(title))
			K.Conver.insertConver(this.id, 'place', title);
	},
	//TODO use form and submit
	'keydown .conver-title-new': function(e,tmpl) {
		if(e.keyCode===13)//enter
		{
			e.preventDefault();
			tmpl.$('.conver-btn-new').trigger('click');
		}
	}
});

Template.tabUser_conver.events({
	'click .panel-btn-conversList': function(e, tmpl) {

		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');
		
		this.loadConvers(function() {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});