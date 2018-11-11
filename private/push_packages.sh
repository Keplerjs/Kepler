#!/bin/bash
#
#unpublish a package:
#	meteor admin set-unmigrated  keplerjs:base
#
for d in ../packages/keplerjs* ; do

  echo "$d"
  cd $d

  git status
  git commit -a -m "$1"
  git push

  cd ../../private
done
