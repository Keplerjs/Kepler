/** 
 * selectors for all MongDB queries, its' can be literal of functions
 * @module
 * @name filters
 * @type {Object}
 */
Kepler.queries = {
	/**
	 * selector for all find() and FindOne() query in Places collection
	 * @type {Object}
	 */
	placeFind: {
		//TODO uncomment active: 1 //example of usage.. for show only active places 
	},
	placeGeometries: {
        "geometry.type":{"$ne":"Point"}
    },
    placeCheckins: {
        "checkins": {"$ne":[]}
    }
};