#!/bin/bash
#
#unpublish a package:
#	meteor admin set-unmigrated  keplerjs:base
#
#
IGNORE="../packages/keplerjs-*"

echo "publish 3rd party packages..."

for d in $IGNORE ; do

	echo "$d"
	cd $d
	meteor publish
	
	#return back
	cd ../../private
done
