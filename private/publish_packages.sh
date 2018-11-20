#!/bin/bash
#
#unpublish a package:
#	meteor admin set-unmigrated  keplerjs:base
#
#
IGNORE="../packages/keplerjs-*"
declare -A array
for i in $IGNORE; do
    array[$i]=1
done

for d in ../packages/* ; do

	if [[ ${array[$d]} ]]; then
		continue
	fi

	echo "$d"
	cd $d
	meteor publish
	
	#return back
	cd ../../private
done