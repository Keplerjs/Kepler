for d in ../packages/* ; do
  echo "$d"
  cd $d
  meteor publish
  pwd
  cd ../../private
done