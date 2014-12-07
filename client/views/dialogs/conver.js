
Template.conver_input.rendered = function() {
	this.$('textarea').expandTextarea();
};

Template.conver_input.events({
	'keydown textarea': function(e,tmpl) {
		if(e.keyCode===13)//enter
		{
			e.preventDefault();
			var text$ = tmpl.$('textarea'),
				convId = Session.get('dialogConverId');
			
			Climbo.convers.addMsgToConver(convId, text$.val() );
			text$.val('');
		}
	}
});

Template.conver_new.events({
	'click .conver-btn-new': function(e,tmpl) {
		e.preventDefault();
		var title = _.str.clean(tmpl.$('.conver-txt-new').val());
		
		if(!_.str.isBlank(title))
			Climbo.convers.newConverInPlace(title, this.placeId);
		//ricarica elenco convers di place
	},
	'keydown .conver-txt-new': function(e,tmpl) {
		if(e.keyCode===13)//enter
		{
			e.preventDefault();
			tmpl.$('.conver-btn-new').trigger('click');
		}
	}
});