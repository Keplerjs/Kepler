
Template.pageAdmin_admin_raw.helpers({
	rawdata: function() {
		return K.findAdminUserById(this._id).fetch()[0];
	}
});