
var geoUtils = Package['geojson-utils'].GeoJSON;
/**
 * @namespace
 * @memberOf Util
 */
Kepler.Util.geo = {
	geojsonUtils: geoUtils,
	/**
	 * round coordinates precision
	 * @param  {Array} loc  [description]
	 * @param  {Number} prec [description]
	 * @return {Array}      [description]
	 */
	locRound: function(loc, prec) {
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
	 * generate a bounding box having a location ad center dy certain distance
	 * @param  {Array} loc     [description]
	 * @param  {Number} dist    [description]
	 * @param  {Boolean} corners [description]
	 * @return {Array}         [description]
	 */
	locBuffer: function(loc, dist, corners) {
		//TODO check valid loc
		corners = corners || false;

		var b = K.Util.geo.meters2rad(dist),
			lat1 = parseFloat((loc[0]-b).toFixed(4)),
			lon1 = parseFloat((loc[1]-b).toFixed(4)),
			lat2 = parseFloat((loc[0]+b).toFixed(4)),
			lon2 = parseFloat((loc[1]+b).toFixed(4));

		return corners ? [[lat1, lon1], [lat2, lon2]] : [lat1, lon1, lat2, lon2];
	},
	/**
	 * round bounding box precision
	 * @param  {Array} bb   [description]
	 * @param  {Number} prec [description]
	 * @return {Array}      [description]
	 */
	bboxRound: function(bb, prec) {
		prec = _.isNumber(prec) ? prec : 6;
		return [ K.Util.geo.locRound(bb[0], prec),
				 K.Util.geo.locRound(bb[1], prec) ];
	},
	/**
	 * convert bounding box fromm array of array to sinngle array
	 * @param  {Array} bb [description]
	 * @return {Array}    [description]
	 */
	bboxPlain: function(bb) {
		return [ bb[0][0], bb[0][1], bb[1][0], bb[1][1] ];
	},
	/**
	 * convert bounding box from single array to double array
	 * @param  {Array} bb [description]
	 * @return {Array}    [description]
	 */
	bboxReverse: function(bb) {
		return [ [bb[0][1], bb[0][0]], [bb[1][1], bb[1][0]] ];
	},
	/**
	 * check if a location is inside a certain bounding box
	 * @param  {Array} bb [description]
	 * @param  {Array} ll [description]
	 * @return {Boolean}    [description]
	 */
	bboxContains: function(bb,ll)	{
		//inspired by npm 'geojson-utils'.pointInBoundingBox()
		if(!_.isArray(bb) || !K.Util.valid.loc(ll)) return false;
		return !(ll[0] < bb[0][0] || ll[0] > bb[1][0] || ll[1] < bb[0][1] || ll[1] > bb[1][1]);
	},	
	/**
	 * convert a certain distrnace from radians to meters
	 * @param  {Number} deg [description]
	 * @return {Number}     [description]
	 */
	deg2rad: function(deg) {
		return deg * (Math.PI/180);
	},
	/**
	 * convert a certain distrnace from meters to radians
	 * @param  {Number} m [description]
	 * @return {Number}   [description]
	 */
	meters2rad: function(m) {
		return (m/1000)/111.12;
	},
	/**
	 * calculate distance in meters from two locations
	 * @param  {Array} p1 [description]
	 * @param  {Array} p2 [description]
	 * @return {Number}    [description]
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
	 * calculate the azimut angle from two locations
	 * @param  {Array} startLoc [description]
	 * @param  {Array} endLoc   [description]
	 * @return {Number}          [description]
	 */
	azimuth: function(loc1, loc2) {

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
	 * convert geometry to WKT format
	 * @param  {[type]} geom [description]
	 * @return {[type]}      [description]
	 */
	/*geosjon2wkt: function(layer) {
	    var lng, lat, coords = [];
	    if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
	        var latlngs = layer.getLatLngs();
	        for (var i = 0; i < latlngs.length; i++) {
		    	//latlngs[i]
		    	coords.push(latlngs[i].lng + " " + latlngs[i].lat);
		        if (i === 0) {
		        	lng = latlngs[i].lng;
		        	lat = latlngs[i].lat;
		        }
		}
	        if (layer instanceof L.Polygon) {
	            return "POLYGON((" + coords.join(",") + "," + lng + " " + lat + "))";
	        } else if (layer instanceof L.Polyline) {
	            return "LINESTRING(" + coords.join(",") + ")";
	        }
	    } else if (layer instanceof L.Marker) {
	        return "POINT(" + layer.getLatLng().lng + " " + layer.getLatLng().lat + ")";
	    }
	},*/
	/**
	 * create a GeoJSON Point geometry
	 * @param  {Array} ll [description]
	 * @return {Object}    [description]
	 */
	point: function(ll) {
		return {
			"type": "Point",
			"coordinates": [ll[1],ll[0]]
		};
	},
	/**
	 * create a GeoJSON Feature having certrain properties
	 * @param  {Object} geom   [description]
	 * @param  {Array} coords [description]
	 * @param  {Object} props  [description]
	 * @return {Object}        [description]
	 */
	feature: function(geom, coords, props) {
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
	 * @param  {Array} ff [description]
	 * @return {Object}    [description]
	 */
	featureColl: function(ff, props) {
		ff = ff || [];
		ff = _.isArray(ff) ? ff : [ff];
		props = props || {};
		return {
			"type": "FeatureCollection",
			"properties": props,
			"features": ff
		};
	},
	/**
	 * remove double coordinates from a Linestring geometry
	 * @param  {Object} line [description]
	 * @return {Object}      [description]
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
	 * calculate the length of a Geojson  Linestring geometry
	 * @param  {Object} line [description]
	 * @return {Number}      [description]
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
	 * calculate walking time of a certain distance and with a certain difference in height
	 * @param  {Number} len [description]
	 * @param  {Number} dis [description]
	 * @return {Number}     [description]
	 */
	linestringTime: function(len, dis) {
		//http://ascoltotutti.blogspot.it/2012/12/calcolo-durata-di-un-percorso.html
		var km = len/1000,
			dif = dis>0 ? 4 : 6,	//fattore: salita/discesa
			ore = ( km + (Math.abs(dis)/100) ) / dif,
			sec = Math.round(ore*3600);
		return sec>60 ? sec : 0;
	},
	/**
	 * search for the coordinate of the linestring closest to the point indicated
	 * @param  {[type]} point [description]
	 * @param  {[type]} line  [description]
	 * @return {[type]}       [description]
	 */
	pointInLinestring: function(point, line) {
		var dd = _.map(line.coordinates, function(ll, k) {
				return {
					k: k,
					d: geoUtils.pointDistance(point, {coordinates: ll})
				}
			}),
			min = _.sortBy(dd,'d')[0];
			
		return line.coordinates[ min.k ];
	},
	/**
	 * calculate centroid of geojson polygon geometry, return a loc [lat,lon]
	 * @param  {[type]} poly [description]
	 * @return {[type]}      [description]
	 */
	centroid: function(geom) {
		
		var ll, point;

		if(geom.type==='Point')
			ll = geom.coordinates
		else
		{
			if(geom.type==='Polygon') {
				cc = geom.coordinates;
			}
			else if(geom.type==='MultiPolygon') {
				cc = geom.coordinates[0];
				//TODO intersect multiple centers of polygons
			}
			else if(geom.type==='LineString') {
				cc = [geom.coordinates];
				//TODO point in polyline
			}
			else if(geom.type==='MultiLineString') {
				cc = [geom.coordinates[0]];
				//TODO point in polyline
			}
			else {
				console.warn('Core: L.Util.geo.centroid() geometry not supported',geom.type)
				return null;
			}

			point = geoUtils.centroid({coordinates: cc});

			ll = point.coordinates;

			if(geom.type==='LineString') {
				ll = K.Util.geo.pointInLinestring(point, geom);
			}
		}

		return ll && [ll[1], ll[0]];
	},
	/**
	 * calculate a length of a Leaflet Polyline 
	 * @param  {Object} line [description]
	 * @return {Number}      [description]
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
	 * pick a random location inside a certain bounding box
	 * @param  {Array} bbox [description]
	 * @return {Array}      [description]
	 */
	locRandom: function(bbox) {
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
	 * coordinates transformation 
	 * @param  {Array} loc    [description]
	 * @param  {String} crsSrc [description]
	 * @param  {String} crsDst [description]
	 * @return {Array}        [description]
	 */
	locTransform: function(loc, crsSrc, crsDst) {
		//https://leafletjs.com/reference-1.3.4.html#crs
		crsSrc = crsSrc || '3857';
		crsDst = crsDst || '4326';
		var r = /[0-9]/,
			p = 'EPSG',
			cs = r.test(crsSrc[0]) ? p+crsSrc : crsSrc,
			cd = r.test(crsDst[0]) ? p+crsDst : crsDst,
			ps = L.CRS[cs].project(L.latLng(loc));
			ld = L.CRS[cd].unproject(ps);
		return ld;
	},

	/**
	 * parse coordinates location 
	 * @param  {String} dmsString [description]
	 * @return {Array}           [description]
	 */
	locParseString: function(dmsString) {
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

		    if (!inRange(degrees, 0, 180)) return null;// throw 'Degrees out of range';
		    if (!inRange(minutes, 0, 60)) return null;// throw 'Minutes out of range';
		    if (!inRange(seconds, 0, 60)) return null;// throw 'Seconds out of range';

		    return {
		        decDeg: sign * (degrees + minutes / 60 + seconds / 3600),
		        latLon: latLon
		    };
		}

		function inRange(value, a, b) {
		    return value >= a && value <= b;
		}

	    m1 = dmsString.match(dmsRe);

	    if (!m1) return null;// throw 'Could not parse string';

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
	        	return null;//throw 'Could not parse string';
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

