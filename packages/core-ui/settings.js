
var ifUserLogged = function() {
	return Meteor.user()
};

Kepler.settings.public.templates = {
	
	//TODO refact.. templates without placeholder
	"tabPlace_ui_info": { "show": true, order:-10},
	"tabPlace_ui_hist": { "show": true, order:-10},
	"tabPlace_ui_nearby": { "show": true, order:-10},
	//tabPlace_ui_nearby	
	//
	"tabUser_ui_info": { "show": true},
	"tabUser_ui_friends": { "show": ifUserLogged},
	"tabUser_ui_hist": { "show": ifUserLogged},

	//core/ui templates configurations
	"navSidebar": {
		"navSidebar_ui_profile": { order:-10 },
		"navSidebar_ui_users":   { order:0 },
		"navSidebar_ui_places":  { order:0 },
		"navSidebar_ui_connect": { order:10 }
	},
	"panelProfile": {
		"panelProfile_ui_tablocation": { order:-10 },
		"panelProfile_ui_hist": { order:-10 },
		"panelProfile_ui_sets": { order:10 },
		"panelProfile_ui_home": { order:10 },
		"panelProfile_ui_logout": { order:10 }
	},
	"panelSettings": {
		"panelSettings_ui_bio": { order:-10 },
		"panelSettings_ui_contact": { order:-10, show:false /*work in progress*/ },
		"panelSettings_ui_map": { order:-10 },
		"panelSettings_ui_lang": { order:-10 },
		"panelSettings_ui_block": { order:10 },
		"panelSettings_ui_account": { order:10 },
		"panelSettings_ui_version": { order:10 },
	},
	"itemPlace": {
		"itemPlace_ui_checkins": { order:-10 }
	},
	"panelPlace": {
		"panelPlace_ui_btn_checkin": { order:-10, show: ifUserLogged },
		"panelPlace_ui_btns": { order:-10 }
	},
	"panelPlaces": {
		"panelPlaces_ui_search": { order:0 }
	},
	"tabPlace": {
		"tabPlace_ui_info": { order:-10 }
	},
	"panelUser": {
		"panelUser_ui_bio": { order:-20 },
		"panelUser_ui_status": { order:-20, show: ifUserLogged },
		"panelUser_ui_btns": { order:-20, show: ifUserLogged },
		"panelUser_ui_tablocation": { order:-10 }
	},
	"panelUsers": {
		"panelUsers_ui_search": { order:0 },
		"panelUsers_ui_status": { order:0, show: ifUserLogged },
	},
	"popupPlace": {
		"popupPlace_ui_checkins": {order:-10},
		"popupPlace_ui_geometry": {order:-10}
	},
	"popupCursor": {
		"popupCursor_ui_loc": {order:-10}
	},
	"markerPlace": {
		"markerPlace_ui_checkins": {order:-10}
	},
	"markerClusterPlace": {
		"markerClusterPlace_ui_checkins": {order:-10}
	},
	"pageHome": {
		"formLogin": { order:10, show: true}
	},
	"footer": {
		"footer_ui_lang": { order:10, show: false}
	}
};