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

if [ $1 != "3rd" ] ; then

	echo "publish base packages..."

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

else

	echo "publish 3rd party packages..."

	for d in $IGNORE ; do

		echo "$d"
		cd $d
		meteor publish
		
		#return back
		cd ../../private
	done
fi