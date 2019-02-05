/** 
 * default fields for new models and data documents
 * @module
 * @name schemas
 */
Kepler.schemas = {

	//TODO use https://atmospherejs.com/aldeed/simple-schema

	/**
	 * Place model
	 * @type {Object}
	 */
	place: {
		name: '',	       //place title
		createdAt: '',	   //new Date() of place insert
		userId: '',	   	   //user to created it
		active:0,	       //visible in map
		indoor:0,		   //is an indoor place
		loc: [],		   //coordinates lat,lng
		checkins: [],	   //users inside place	
		hist: [],		   //recents checkins
		desc: '',		   //description
		warn: '',          //warnings and dangers
		url: '',	   	   //websites url of place
		source: {	   	   //describe source of data
			type: ''
		}
	},
	/**
	 * User model
	 * @type {Object}
	 */
	user: {
		name: '',		   //display name	
		username: '',	   //username used in urls
		createdAt: '',	   //new Date() of user insert
		emails: [], 
		url: '',			//user web sites and social
		profile: {},		//user data
		avatar: '',		    //user photo
		mood: '',		    //status mood message, shown in profile
		loginAt: '',	    //last date of login

		status: '',        
		statusDefault: '', 
		statusConnection:'',

		gender: '',
		city: '',
		lang: 'it',
		loc: null,		   //current gps position
		loclast: null,	   //lat gps position
		checkin: null,	   //id Place where I am
		mob:0,			   //if my device is mobile
		friends: [],	   //ids users friends
		usersPending: [],  //ids users that I send request
		usersReceive: [],  //ids users that I receive request
		usersBlocked: [],  //ids users that I blocked
		hist: [],		   //last places visited
		source: {		   //source of registration by single signon	
			service: '',
			url: '',
			options: {}	
		},	
		settings: {
			map: {
				layer: null,
				center: null  //last center of map
			}
		}
	}
};
