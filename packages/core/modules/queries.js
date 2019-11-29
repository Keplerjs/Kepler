/** 
 * selectors for all MongDB queries
 * @module
 * @name filters
 * @type {Object}
 */
Kepler.queries = {
	/**
	 * selector for all place find and FindOne
	 * @type {Object}
	 */
	placeFind: {
		selector: {
			//active: 1
			//example of usage.. for show only approved places 
		},
		options: {
			fields: {
				//active: 1
			}
		}
	}
};