#!/usr/bin/env python
#
#list fields from collection
#
#	$ ./fields.py dbname collectioname
#

from pymongo import MongoClient
from bson.code import Code
import json
import sys

client = MongoClient('localhost', 27017)

db = client[sys.argv[1]]
coll = db[sys.argv[2]]

mapper = Code("""
	function() {
		for (var key in this)
			emit(key, null);
	}
""")

reducer = Code("""
	function(key, stuff) { return null; }
""")

distinctThingFields = coll.map_reduce(mapper, reducer, out = {'inline' : 1}, full_response = True)

for f in distinctThingFields['results']:
	print f['_id']
