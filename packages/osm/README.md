## keplerjs:osm

Keplerjs Openstreetmap and Overpass API


http://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide
http://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example

regexp over keys
http://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide#Tag_request_clauses_.28or_.22tag_filters.22.29

### Api usage

```javascript
K.Osm.findByLoc(loc, {
	types: 'node',					
	tags: ["amenity=drinking_water","amenity=fountain"],
	dist: 1000,
	limit: 10,
	meta: false
});
```