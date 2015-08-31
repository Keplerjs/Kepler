/* 
 * Leaflet Dynamic JSON Layer v0.1.7 - 2015-07-15 
 * 
 * Copyright 2015 Stefano Cudini 
 * stefano.cudini@gmail.com 
 * http://labs.easyblog.it/ 
 * 
 * Licensed under the MIT license. 
 * 
 * Demo: 
 * http://labs.easyblog.it/maps/leaflet-layerjson/ 
 * 
 * Source: 
 * git@github.com:stefanocudini/leaflet-layerjson.git 
 * 
 */

(function() {

L.LayerJSON = L.FeatureGroup.extend({

	includes: L.Mixin.Events,
	//
	//Managed Events:
	//	Event			Data passed		 Description
	//  dataloading		{req: url|bbox}	 fired before ajax/jsonp request, req is bbox if url option is null
	//	dataloaded		{data: json}	 fired on ajax/jsonp request success
	//
	options: {
		url: '',					//url map: "search.php?lat1={lat1}&lat2={lat2}&lon1={lon1}&lon2={lon2}"
		jsonpParam: null,			//parameter name for jsonp requests
		callData: null,				//custom function for data source, params: (req: url|bbox, callback: func), return {abort: func}
		filterData: null,			//function that filter marker by its data, run before onEachMarker
		//
		propertyItems: '', 			//json property used contains data items
		propertyTitle: 'title', 	//json property used as title(popup, marker, icon)
		propertyLoc: 'loc', 		//json property used as Latlng of marker use array for select double fields(ex. ['lat','lon'] )
		locAsGeoJSON: false, 		//interpret location data as [lon, lat] value pair instead of [lat, lon]
		//							// support dotted format: 'prop.subprop.title'
		layerTarget: null,			//pre-existing layer to add markers, is a LayerGroup or L.MarkerClusterGroup http://goo.gl/tvmu0
		dataToMarker: null,			//function that will be used for creating markers from json points, similar to pointToLayer of L.GeoJSON
		onEachMarker: null,			//function called on each marker created, similar to option onEachFeature of L.GeoJSON
		buildPopup: null,			//function popup builder
		optsPopup: null,			//popup options
		buildIcon: null,			//function icon builder
		//
		minZoom: 10,				//min zoom for call data
		caching: true,				//enable requests caching
		minShift: 1000,				//min shift for update data(in meters)
		updateOutBounds: true,		//request new data only if current bounds higher than last bounds
		precision: 6,				//number of digit send to server for lat,lng precision
		attribution: ''				//attribution text
		//TODO option: enabled, if false
		//TODO methods: enable()/disable()
		//TODO send map bounds decremented of certain margin
	},

	initialize: function(options) {
		L.FeatureGroup.prototype.initialize.call(this, []);
		L.Util.setOptions(this, options);
		this._dataToMarker = this.options.dataToMarker || this._defaultDataToMarker;
		this._buildIcon = this.options.buildIcon || this._defaultBuildIcon;
		this._filterData = this.options.filterData || null;
		this._hashUrl = this.options.url;

		if(this._hashUrl)
		{
			this._callData = this.getAjax;
			if(this.options.jsonpParam)
			{
				this._hashUrl += '&'+this.options.jsonpParam+'=';
				this._callData = this.getJsonp;
			}
		}
		else
			this._callData = this.options.callData;

		this._curReq = null;
		this._center = null;
		this._maxBounds = null;
		this._markersCache = {};	//used for caching _dataToMarker builds
	},

	onAdd: function(map) {

		L.FeatureGroup.prototype.onAdd.call(this, map);		//set this._map
		this._center = map.getCenter();
		this._maxBounds = map.getBounds();

        map.on({
            moveend: this._onMove,
            zoomend: this._onMove
        }, this);

		this.update();
	},

	onRemove: function(map) {

		map.off({
            moveend: this._onMove,
            zoomend: this._onMove
        }, this); //FIXME not work!

		L.FeatureGroup.prototype.onRemove.call(this, map);

		for (var i in this._layers) {
			if (this._layers.hasOwnProperty(i)) {
				L.FeatureGroup.prototype.removeLayer.call(this, this._layers[i]);
			}
		}
	},

	getAttribution: function() {
		return this.options.attribution;
	},

	addLayer: function (layer) {
		if(this.options.layerTarget)
		{
			this.options.layerTarget.addLayer.call(this.options.layerTarget, layer);
			return this.fire('layeradd', {layer: layer});
		}
		else
			L.FeatureGroup.prototype.addLayer.call(this, layer);
		return this;
	},

	removeLayer: function (layer) {
		if(this.options.layerTarget)
		{
			this.options.layerTarget.removeLayer.call(this.options.layerTarget, layer);
			return this.fire('layerremove', {layer: layer});
		}
		else
			L.FeatureGroup.prototype.removeLayer.call(this, layer);
		return this;
	},

	clearLayers: function () {

		this._markersCache = {};	//cached gen markers

		if(this.options.layerTarget)
			this.options.layerTarget.clearLayers.call(this.options.layerTarget);
		else
			L.FeatureGroup.prototype.clearLayers.call(this);
		return this;
	},

	_getPath: function(obj, prop) {
		var parts = prop.split('.'),
			last = parts.pop(),
			len = parts.length,
			cur = parts[0],
			i = 1;

		if(len > 0)
			while((obj = obj[cur]) && i < len)
				cur = parts[i++];

		if(obj)
			return obj[last];
	},

	_defaultBuildIcon: function(data, title) {
		return new L.Icon.Default();
	},

	_defaultDataToMarker: function(data, latlng) {	//make marker from data

		var title = this._getPath(data, this.options.propertyTitle),
			markerOpts = L.Util.extend({icon: this._buildIcon(data,title), title: title }, data),
			marker = new L.Marker(latlng, markerOpts ),
			htmlPopup = null;

		if(this.options.buildPopup && (htmlPopup = this.options.buildPopup(data, marker)))
			marker.bindPopup(htmlPopup, this.options.optsPopup );

		return marker;
	},

	addMarker: function(data) {

		var latlng, hash, propLoc = this.options.propertyLoc;

		if( L.Util.isArray(propLoc) ) {
			latlng = L.latLng( parseFloat( this._getPath(data, propLoc[0]) ),
							   parseFloat( this._getPath(data, propLoc[1]) )  );
		}
		else {
			if (this.options.locAsGeoJSON) {
				var lnglat = this._getPath(data, propLoc);
				latlng = L.latLng( lnglat[1], lnglat[0] );
			} else {
				latlng = L.latLng( this._getPath(data, propLoc) );
			}
		}

		hash = [latlng.lat,latlng.lng].join() + this._getPath(data, this.options.propertyTitle);

		if(typeof this._markersCache[hash] === 'undefined')
			this._markersCache[hash] = this._dataToMarker(data, latlng);

		if(this.options.onEachMarker)//maybe useless
			this.options.onEachMarker(data, this._markersCache[hash]);

		if(this._markersCache[hash])
			this.addLayer( this._markersCache[hash] );
	},

	_markersCacheToLayer: function(bounds) {	//show cached markers to layer
		for(var i in this._markersCache)
		{
			if(this._markersCache[i])
			{
				if(bounds.contains(this._markersCache[i].getLatLng()) )
					this.addLayer(this._markersCache[i]);
				else
					this.removeLayer(this._markersCache[i]);
			}
		}
	},

	_onMove: function(e) {
		var newZoom = this._map.getZoom(),
			newCenter = this._map.getCenter(),
			newBounds = this._map.getBounds();

		if(newZoom < this.options.minZoom)
			return false;

		if(this.options.caching) {

			if( this.options.minShift && this._center.distanceTo(newCenter) < this.options.minShift )
				return false;
			else
				this._center = newCenter;

			if( this.options.updateOutBounds && this._maxBounds.contains(newBounds) )//bounds not incremented
			{
				this._markersCacheToLayer(newBounds);
				//TODO maybe execute this ever
				return false;
			}
			else
				this._maxBounds.extend(newBounds);
		}
		else
		 	this.clearLayers();

		this.update();
	},

	update: function() {	//populate target layer

		var prec = this.options.precision,
			bb = this._map.getBounds(),
			sw = bb.getSouthWest(),
			ne = bb.getNorthEast(),
			bbox = [
				[ parseFloat(sw.lat.toFixed(prec)), parseFloat(sw.lng.toFixed(prec)) ],
				[ parseFloat(ne.lat.toFixed(prec)), parseFloat(ne.lng.toFixed(prec)) ]
			];

		if(this._hashUrl)							//conver bbox to url string
			bbox = L.Util.template(this._hashUrl, {
					lat1: bbox[0][0], lon1: bbox[0][1],
					lat2: bbox[1][0], lon2: bbox[1][1]
				});

		if(this._curReq && this._curReq.abort)
			this._curReq.abort();		//prevent parallel requests

		var that = this;
		that.fire('dataloading', {req: bbox });
		this._curReq = this._callData(bbox, function(json) {

			that._curReq = null;

			if(that._filterData)
				json = that._filterData(json);

			if(that.options.propertyItems)
				json = that._getPath(json, that.options.propertyItems);

			that.fire('dataloaded', {data: json});

			for(var k in json)
				that.addMarker.call(that, json[k]);
		});
	},


/////////////////ajax jsonp methods

	getAjax: function(url, cb) {	//default ajax request

		if (window.XMLHttpRequest === undefined) {
			window.XMLHttpRequest = function() {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP.6.0");
				}
				catch  (e1) {
					try {
						return new ActiveXObject("Microsoft.XMLHTTP.3.0");
					}
					catch (e2) {
						throw new Error("XMLHttpRequest is not supported");
					}
				}
			};
		}
		var request = new XMLHttpRequest();
		request.open('GET', url);
		request.onreadystatechange = function() {
			var response = {};
		    if (request.readyState === 4 && request.status === 200) {
		    	try {
					if(window.JSON)
				        response = JSON.parse(request.responseText);
					else
						response = eval("("+ request.responseText + ")");
		    	} catch(err) {
		    		response = {};		    		
		    		throw new Error('Ajax response is not JSON');
		    	}
		        cb(response);
		    }
		};
		request.send();
		return request;
	},

	getJsonp: function(url, cb) {  //extract searched records from remote jsonp service
		var body = document.getElementsByTagName('body')[0],
			script = L.DomUtil.create('script','leaflet-layerjson-jsonp', body );

		//JSONP callback
		L.LayerJSON.callJsonp = function(data) {
			cb(data);
			body.removeChild(script);
		}
		script.type = 'text/javascript';
		script.src = url+'L.LayerJSON.callJsonp';
		return {
			abort: function() {
				script.parentNode.removeChild(script);
			}
		};
	}
});

L.layerJSON = function (options) {
    return new L.LayerJSON(options);
};

}).call(this);
