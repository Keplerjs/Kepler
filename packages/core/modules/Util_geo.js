
Kepler.Util.geo = {
	/**
	 * round coordinates precision
	 * @param  {Array} loc  [description]
	 * @param  {Number} prec [description]
	 * @return {Array}      [description]
	 */
	roundLoc: function(loc, prec) {
		prec = _.isNumber(prec) ? prec : 6; 
		if( (typeof loc === 'undefined' || loc === null) ||
			(typeof loc[0] === 'undefined' || loc[0] === null) ||
			(typeof loc[1] === 'undefined' || loc[1] === null) )
			return null;
		
		var lat = parseFloat(loc[0]).toFixed(prec),
			lng = parseFloat(loc[1]).toFixed(prec)

		return [ parseFloat(lat), parseFloat(lng) ];
	},
	/**
	 * rounc bounding box precision
	 * @param  {[Array,Array]} bb   [description]
	 * @param  {Number} prec [description]
	 * @return {[Array,Array]}      [description]
	 */
	roundBbox: function(bb, prec) {
		prec = prec || 6;
		return [ K.Util.geo.roundLoc(bb[0], prec),
				 K.Util.geo.roundLoc(bb[1], prec) ];
	},
	/**
	 * convert bounding box fromm array of array to sinngle array
	 * @param  {[type]} bb [description]
	 * @return {[type]}    [description]
	 */
	plainBbox: function(bb) {
		return [ bb[0][0], bb[0][1], bb[1][0], bb[1][1] ];
	},
	/**
	 * convert bounding box from single array to double array
	 * @param  {[type]} bb [description]
	 * @return {[type]}    [description]
	 */
	reverseBbox: function(bb) {
		return [ [bb[0][1], bb[0][0]], [bb[1][1], bb[1][0]] ];
	},
	/**
	 * generate a bounding box having a location ad center dy certain distance
	 * @param  {[type]} loc     [description]
	 * @param  {[type]} dist    [description]
	 * @param  {[type]} corners [description]
	 * @return {[type]}         [description]
	 */
	bufferLoc: function(loc, dist, corners) {
		
		corners = corners || false;

		var b = K.Util.geo.meters2rad(dist),
			lat1 = parseFloat((loc[0]-b).toFixed(4)),
			lon1 = parseFloat((loc[1]-b).toFixed(4)),
			lat2 = parseFloat((loc[0]+b).toFixed(4)),
			lon2 = parseFloat((loc[1]+b).toFixed(4));

		return corners ? [[lat1, lon1], [lat2, lon2]] : [lat1, lon1, lat2, lon2];
	},
	/**
	 * convert a certain distrnace from radians to meters
	 * @param  {[type]} deg [description]
	 * @return {[type]}     [description]
	 */
	deg2rad: function(deg) {
		return deg * (Math.PI/180);
	},
	/**
	 * convert a certain distrnace from meters to radians
	 * @param  {[type]} m [description]
	 * @return {[type]}   [description]
	 */
	meters2rad: function(m) {
		return (m/1000)/111.12;
	},
	/**
	 * calculate distance in meters from two locations
	 * @param  {[type]} p1 [description]
	 * @param  {[type]} p2 [description]
	 * @return {[type]}    [description]
	 */
	distance: function(p1, p2) {
		if(!K.Util.valid.loc(p1) || !K.Util.valid.loc(p2))
			return 0;
		var deg2rad = K.Util.geo.deg2rad,
			R = 6371797, // Radius of the earth in m
			dLat = deg2rad(p2[0]-p1[0]),  // deg2rad below
			dLon = deg2rad(p2[1]-p1[1]), 
			a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(deg2rad(p1[0])) * Math.cos(deg2rad(p2[0])) * 
				Math.sin(dLon/2) * Math.sin(dLon/2),
			c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		return Math.round(R * c);
	},
	/**
	 * calculate walking time of a certain distance and with a certain difference in height
	 * @param  {[type]} len [description]
	 * @param  {[type]} dis [description]
	 * @return {[type]}     [description]
	 */
	timeTrack: function(len, dis) {
		//http://ascoltotutti.blogspot.it/2012/12/calcolo-durata-di-un-percorso.html
		var km = len/1000,
			dif = dis>0 ? 4 : 6,	//fattore: salita/discesa
			ore = ( km + (Math.abs(dis)/100) ) / dif,
			sec = Math.round(ore*3600);
		return sec>60 ? sec : 0;
	},
	/**
	 * check if a location is inside a certain bounding box
	 * @param  {[type]} bb [description]
	 * @param  {[type]} ll [description]
	 * @return {[type]}    [description]
	 */
	contains: function (bb, ll) { // (LatLngBounds) or (LatLng) -> Boolean
		
		if(!_.isArray(bb) || !K.Util.valid.loc(ll)) return false;

		return L.latLngBounds(bb).contains(L.latLng(ll));
		//var GeoJSON = Package['geojson-utils'].GeoJSON;
		//return GeoJSON.pointInBoundingBox(bb, [ll[1],ll[0]]);
	},	
	/**
	 * create a GeoJSON Point geometry
	 * @param  {[type]} ll [description]
	 * @return {[type]}    [description]
	 */
	createPoint: function(ll) {
		return {
			"type": "Point",
			"coordinates": ll
		};
	},
	/**
	 * create a GeoJSON Feature having certrain properties
	 * @param  {[type]} geom   [description]
	 * @param  {[type]} coords [description]
	 * @param  {[type]} props  [description]
	 * @return {[type]}        [description]
	 */
	createFeature: function(geom, coords, props) {
		props = props || {};
		coords = coords || [];
		return {
			"type": "Feature",
			"properties": props,
			"geometry": {
				"type": geom,
				"coordinates": coords
			}
		};
	},
	/**
	 * create a GeoJSON Feature collection by list of features
	 * @param  {[type]} ff [description]
	 * @return {[type]}    [description]
	 */
	createFeatureColl: function(ff) {
		return {
			"type": "FeatureCollection",
			"features": ff || []
		};
	},
	/**
	 * calculate the length of a Linestring geometry
	 * @param  {[type]} line [description]
	 * @return {[type]}      [description]
	 */
	linestringLen: function(line) {
		var cc = line.coordinates, p, d = 0;
		for(var i=0; i<cc.length; i++)
		{
			if(i>0 && cc[i])
				d += K.Util.geo.distance( [p[1], p[0]], [cc[i][1], cc[i][0]] );
			p = cc[i];
		}
		return d;
	},
	/**
	 * remove double coordinates from a Linestring geometry
	 * @param  {[type]} line [description]
	 * @return {[type]}      [description]
	 */
	linestringClean: function(line) {
		var cc = line.coordinates,
			ncc = [];
		for(var i=0; i<cc.length; i++)
		{
			if( i>0 &&
				cc[i][0]===cc[i-1][0] &&
				cc[i][1]===cc[i-1][1])
				continue;
			ncc.push([parseFloat(cc[i][0]),parseFloat(cc[i][1])]);
		}
		line.coordinates = ncc;
		return line;
	},
	/**
	 * calculate a length of a Leaflet Polyline 
	 * @param  {[type]} line [description]
	 * @return {[type]}      [description]
	 */
	polylineLen: function(line) {
		var ll = line.getLatLngs(), d = 0, p = null;
		for(var i=0; i<ll.length; i++)
		{
			if(i) d += p.distanceTo(ll[i]);
			p = ll[i];
		}
		return d;
	},
	/**
	 * calculate the azimut angle from two locations
	 * @param  {[type]} startLoc [description]
	 * @param  {[type]} endLoc   [description]
	 * @return {[type]}          [description]
	 */
	angleLocs: function(loc1, loc2) {

		var RAD2DEG = 0.017453,
			DEG2RAD = 57.2957795,
			dlat = loc2[0] - loc1[0],
			dlng = loc2[1] - loc1[1],
			ang = Math.atan2(dlng * Math.cos(loc2.lat() * RAD2DEG), dlat)* DEG2RAD;

		if (ang >= 360)
			ang -= 360;
		else if (ang < 0)
			ang += 360;

		return ang;
	},
	/**
	 * pick a random location inside a certain bounding box
	 * @param  {[type]} bbox [description]
	 * @return {[type]}      [description]
	 */
	randomLoc: function(bbox) {
		var world = [[-90, -180], [90, 180]];
		bbox = bbox || world;
		var sw = bbox[0],
			ne = bbox[1],
			lngs = ne[1] - sw[1],
			lats = ne[0] - sw[0];
		return [
			sw[0] + lats * Math.random(),
			sw[1] + lngs * Math.random()
		];
	},

	/**
	 * parse coordinates location 
	 * @param  {[type]} dmsString [description]
	 * @return {[type]}           [description]
	 */
	parseLocString: function(dmsString) {
		//https://github.com/gmaclennan/parse-dms
		//example: parseLoc('59°12\'7.7"N 02°15\'39.6"W')

	    dmsString = dmsString.trim();

	    // Inspired by https://gist.github.com/JeffJacobson/2955437
	    // See https://regex101.com/r/kS2zR1/3
	    var dmsRe = /([NSEW])?(-)?(\d+(?:\.\d+)?)[°º:d\s]?\s?(?:(\d+(?:\.\d+)?)['’‘′:]\s?(?:(\d{1,2}(?:\.\d+)?)(?:"|″|’’|'')?)?)?\s?([NSEW])?/i;

	    var result = {};

	    var m1, m2, decDeg1, decDeg2, dmsString2;

		function decDegFromMatch(m) {
		    var signIndex = {
		        "-": -1,
		        "N": 1,
		        "S": -1,
		        "E": 1,
		        "W": -1
		    };

		    var latLonIndex = {
		        "N": "lat",
		        "S": "lat",
		        "E": "lon",
		        "W": "lon"
		    };
		    var degrees, minutes, seconds, sign, latLon;

		    sign = signIndex[m[2]] || signIndex[m[1]] || signIndex[m[6]] || 1;
		    degrees = Number(m[3]);
		    minutes = m[4] ? Number(m[4]) : 0;
		    seconds = m[5] ? Number(m[5]) : 0;
		    latLon = latLonIndex[m[1]] || latLonIndex[m[6]];

		    if (!inRange(degrees, 0, 180)) throw 'Degrees out of range';
		    if (!inRange(minutes, 0, 60)) throw 'Minutes out of range';
		    if (!inRange(seconds, 0, 60)) throw 'Seconds out of range';

		    return {
		        decDeg: sign * (degrees + minutes / 60 + seconds / 3600),
		        latLon: latLon
		    };
		}

		function inRange(value, a, b) {
		    return value >= a && value <= b;
		}

	    m1 = dmsString.match(dmsRe);

	    if (!m1) throw 'Could not parse string';

	    // If dmsString starts with a hemisphere letter, then the regex can also capture the 
	    // hemisphere letter for the second coordinate pair if also in the string
	    if (m1[1]) {
	        m1[6] = undefined;
	        dmsString2 = dmsString.substr(m1[0].length - 1).trim();
	    } else {
	        dmsString2 = dmsString.substr(m1[0].length).trim();
	    }

	    decDeg1 = decDegFromMatch(m1);

	    m2 = dmsString2.match(dmsRe);

	    decDeg2 = m2 ? decDegFromMatch(m2) : {};

	    if (typeof decDeg1.latLon === 'undefined') {
	        if (!isNaN(decDeg1.decDeg) && isNaN(decDeg2.decDeg)) {
	            // If we only have one coordinate but we have no hemisphere value,
	            // just return the decDeg number
	            return decDeg1.decDeg;
	        } else if (!isNaN(decDeg1.decDeg) && !isNaN(decDeg2.decDeg)) {
	            // If no hemisphere letter but we have two coordinates,
	            // infer that the first is lat, the second lon
	            decDeg1.latLon = 'lat';
	            decDeg2.latLon = 'lon';
	        } else {
	            throw 'Could not parse string';
	        }
	    }

	    // If we parsed the first coordinate as lat or lon, then assume the second is the other
	    if (typeof decDeg2.latLon === 'undefined') {
	        decDeg2.latLon = decDeg1.latLon === 'lat' ? 'lon' : 'lat';
	    }

	    result[decDeg1.latLon] = decDeg1.decDeg;
	    result[decDeg2.latLon] = decDeg2.decDeg;

	    return [result.lat, result.lon];
	}
/*	deg2dms: function(decDegrees) {

		var getDMSLonNotation = function(decDegrees) {
			if(decDegrees < 0)
				return "W";
			return "E";
		};
		var getDMSLatNotation = function(decDegrees) {
			if(decDegrees < 0)
				return "S";
			return "N";
		};
		var getDMSLongitude = function(decDegrees) {
			var dd = toDMS(decDegrees);
			return dd.degrees + "° " + dd.minutes + "' " + dd.seconds + "\" " + getDMSLonNotation(decDegrees);
		};
		var getDMSLatitude = function(decDegrees) {
			var dd = toDMS(decDegrees);
			return dd.degrees + "° " + dd.minutes + "' " + dd.seconds + "\" " + getDMSLatNotation(decDegrees);
		};

		var dd = {};
		decDegrees = Math.abs(decDegrees);
		dd.degrees = Math.floor(decDegrees);
		dd.minutes = Math.floor(decDegrees * 60) % 60;
		dd.seconds = Math.round(100 * ((decDegrees * 3600) % 60)) / 100;
		return dd;
	},

	dms2deg: function(degrees, minutes, seconds) {
		var d = degrees;
		d += minutes/60;
		d += seconds/3600;
		return Math.round(10000 * d) / 10000;
	}*/
};

