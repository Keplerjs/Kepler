#!/bin/bash
#
#unpublish a package:
#	meteor admin set-unmigrated  keplerjs:base
#
for d in ../packages/keplerjs* ; do

  echo "$d"
  cd $d

  git status

  cd ../../private
done
