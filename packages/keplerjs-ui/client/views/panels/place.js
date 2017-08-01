

Template.place_btns3.events({
	'change .place-btn-checkin :checkbox': function(e, tmpl) {//MAI USARE CLICK, xke genera due esecuzioni!
		if(e.target.checked)
			K.Profile.addCheckin(this.id);
		else
			K.Profile.removeCheckin(this.id);
	}
});
