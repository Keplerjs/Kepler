#!/bin/bash
#
#unpublish a package:
#	meteor admin set-unmigrated  keplerjs:base
#
for d in ../packages/keplerjs* ; do

  echo "$d"
  cd $d

#  git status
  git commit -a -m "update version"
  git push

  cd ../../private
done
