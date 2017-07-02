
Overpass = Npm.require('query-overpass');

/*
var Utils = {
  long2tile: function (lon,zoom) {
  	return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
  },
  lat2tile: function (lat,zoom)  {
    return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
  },
  tile2long: function (x,z) {
    return (x/Math.pow(2,z)*360-180);
  },
  tile2lat: function (y,z) {
    var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
    return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
  },
  
  view2BBoxes: function(l,b,r,t) {
    //console.log(l+"\t"+b+"\t"+r+"\t"+t);
    //this.addBBox(l,b,r,t);
    //console.log("calc bboxes");
    var requestZoomLevel= 14;
    //get left tile index
    var lidx = this.long2tile(l,requestZoomLevel);
    var ridx = this.long2tile(r,requestZoomLevel);
    var tidx = this.lat2tile(t,requestZoomLevel);
    var bidx = this.lat2tile(b,requestZoomLevel);

    //var result;
    var result = [];
    for (var x=lidx; x<=ridx; x++) {
      for (var y=tidx; y<=bidx; y++) {//in tiles tidx<=bidx
        var left = Math.round(this.tile2long(x,requestZoomLevel)*1000000)/1000000;
        var right = Math.round(this.tile2long(x+1,requestZoomLevel)*1000000)/1000000;
        var top = Math.round(this.tile2lat(y,requestZoomLevel)*1000000)/1000000;
        var bottom = Math.round(this.tile2lat(y+1,requestZoomLevel)*1000000)/1000000;
        //console.log(left+"\t"+bottom+"\t"+right+"\t"+top);
        //this.addBBox(left,bottom,right,top);
        //console.log("http://osm.org?bbox="+left+","+bottom+","+right+","+top);
        result.push([[bottom,left],[top, right]]);
      }
    }
    //console.log(result);
    return result;
  },

  addBBox: function (l,b,r,t) {
    var polygon = L.polygon([
      [t, l],
      [b, l],
      [b, r],
      [t, r]
    ]).addTo(this._map);
  }

};

Utils.view2BBoxes(
    this._map.getBounds()._southWest.lng,
    this._map.getBounds()._southWest.lat,
    this._map.getBounds()._northEast.lng,
    this._map.getBounds()._northEast.lat);
//*/