/** 
 * Definitions of returned fields in the queries options
 * @module
 * @name filters
 * @type {Object}
 */
Kepler.filters = {
	/**
	 * current logged user
	 * @type {Object}
	 */
	currentUser: {
		fields: {
			name:1, username:1, avatar:1, usersBlocked:1, status:1, statusDefault:1, statusConnection:1, checkin:1, loc:1, mob:1, loginAt:1, createdAt:1, friends:1, gender:1, city:1, lang:1, url:1, loclast:1, hist:1, 
			
			usersPending:1, usersReceive:1, emails:1, settings:1, source:1, profile:1
		}
	},
	/**
	 * data show in panel user, is my friend
	 * @type {Object}
	 */
	friendPanel: {
		fields: {
			name:1, username:1, avatar:1, usersBlocked:1, status:1, statusDefault:1, statusConnection:1, checkin:1, loc:1, mob:1, loginAt:1, createdAt:1, friends:1, gender:1, city:1, lang:1, url:1, loclast:1, hist:1
		}
	},
	/**
	 * data show in item user, is my friend
	 * @type {Object}
	 */
	friendItem: {
		fields: {
			name:1, username:1, avatar:1, usersBlocked:1, status:1, statusDefault:1, statusConnection:1, checkin:1, loc:1, mob:1, loginAt:1, createdAt:1
		}
	},
	/**
	 * data show in panel user
	 * @type {Object}
	 */
	userPanel: {
		fields: {
			name:1, username:1, avatar:1, usersBlocked:1, /********************************************************************************/ createdAt:1, friends:1, gender:1, city:1, lang:1, url:1
		}
	},
	/**
	 * data show in item user
	 * @type {Object}
	 */		
	userItem: { 
		fields: {
			name:1, username:1, avatar:1, usersBlocked:1,
		}
	},
	/**
	 * data show in panel place
	 * @type {Object}
	 */
	placePanel: {
		fields: {
			name:1, checkins:1, createdAt:1, loc:1, indoor:1, userId:1, geometry:1, desc:1, warn:1, hist:1, url:1, source:1
		}
	},
	/**
	 * data show in item place
	 * @type {Object}
	 */
	placeItem: {
		fields: {
			name:1, checkins:1, createdAt:1, loc:1, indoor:1, userId:1
		}
	},
	/**
	 * data show in item search place, usually text based search without locations
	 * @type {Object}
	 */
	placeSearch: {
		fields: {
			name:1, checkins:1, createdAt:1
		}
	}
};
