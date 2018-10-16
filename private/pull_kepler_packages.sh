#!/bin/bash

for d in ../packages/keplerjs* ; do
  echo "$d"
  cd $d
  git pull
  cd ../../private
done
