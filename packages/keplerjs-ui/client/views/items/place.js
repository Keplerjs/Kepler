
Template.place_btn_checkin.events({
	'click .place-btn-checkin': function(e, tmpl) {
		if(this.isCheckin())
			K.Profile.removeCheckin(this.id);
		else
			K.Profile.addCheckin(this.id);
	}
});
