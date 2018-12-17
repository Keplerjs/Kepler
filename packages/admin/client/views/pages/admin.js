
Template.pageAdmin_admin_raw.helpers({
	rawdata: function() {
		if(this.type==='user')
			return K.findAdminUserById(this._id).fetch()[0];
		else if(this.type==='place')
			return K.findPlaceById(this._id).fetch()[0];
	}
});