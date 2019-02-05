/** 
 * Permissions definitions of fields in the queries for pubblications and methods
 * @module
 * @name filters
 * @type {Object}
 */
Kepler.filters = {
	
	//TODO rename to K.privacy

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
			loc:1, name:1, indoor:1, checkins:1, createdAt:1, userId:1, desc:1, warn:1, hist:1, url:1, source:1
		}
	},
	/**
	 * data show in item place
	 * @type {Object}
	 */
	placeItem: {
		fields: {
			loc:1, name:1, indoor:1, checkins:1, createdAt:1, userId:1
		}
	},
	/**
	 * data show in item search place
	 * @type {Object}
	 */
	placeSearch: {
		fields: {
		           name:1, indoor:1, checkins:1
		}
	}
};
