/*
	Permissions definitions of fields in the queries for pubblications and methods
*/
Kepler.filters = {
//Profile
	currentUser: {
		fields: {
			name:1, username:1, avatar:1, status:1, checkin:1, online:1, loc:1, mob:1, friends:1, createdAt:1, gender:1, city:1, lang:1, loclast:1, onlinelast:1, favorites:1, hist:1, usersPending:1, usersReceive:1, usersBlocked:1, emails:1, isAdmin:1, settings:1,
			profile:1
		}
	},
//Users
	friendPanel: {
		fields: {
			name:1, username:1, avatar:1, status:1, checkin:1, online:1, loc:1, mob:1, friends:1, createdAt:1, gender:1, city:1, lang:1, loclast:1, onlinelast:1, favorites:1, hist:1
		}
	},
	friendItem: {
		fields: {
			name:1, username:1, avatar:1, status:1, checkin:1, online:1, loc:1, mob:1
		}
	},
	userPanel: {
		fields: {
			name:1, username:1, avatar:1, status:1, /********************************/ friends:1, createdAt:1, gender:1, city:1, lang:1
		}
	},		
	userItem: { 
		fields: {
			name:1, username:1, avatar:1, status:1
		}
	},

//Places
	placePanel: {
		fields: {
			loc:1, name:1, rank:1, indoor:1, checkins:1, createdAt:1, userId:1, desc:1, warn:1, hist:1
		}
	},
	placeItem: {
		fields: {
			loc:1, name:1, rank:1, indoor:1, checkins:1, createdAt:1, userId:1
		},
		limit: Meteor.settings.public.searchMaxRes
	},
	placeSearch: {
		fields: {
		           name:1, rank:1, indoor:1, checkins:1
		},
		sort: { name:1 },
		limit: Meteor.settings.public.searchMaxRes
	}
};
