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
		type: 'Feature',   //only for GeoJSON standard compatibility
		properties: {},	   //only for GeoJSON standard compatibility
		geometry: {	   	   //GeoJSON geometry for the place(default is Point)
			type: 'Point',
			coordinates: []//default is loc.reverse()
		},
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
		//TODO add mobile field to specify if place is a static or mobile object(bus,car...)
	},
	/**
	 * User model
	 * @type {Object}
	 */
	user: {
		//TODO implement active field like as place
		name: '',		   //display name	
		username: '',	   //username used in urls
		createdAt: '',	   //new Date() of user insert
		emails: [], 
		mood: '',		    //status mood message, shown in profile
		url: '',			//user web sites and social
		profile: {},		//user data
		avatar: '',		    //user photo
		loginAt: '',	    //last date of login
		loginIp: '',		//last ip from login

		status: '',        
		statusDefault: '', 
		statusConnection:'',

		gender: '',
		city: '',
		lang: 'it',
		loc: null,		   //current gps position
		loclast: null,	   //lat gps position
		checkin: null,	   //id Place where I am
		mob: false,			   //if my device is mobile
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
				query: null,
				layer: null,
				center: null  //last center of map
			}
		}
	}
};
