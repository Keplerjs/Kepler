for d in ../packages/* ; do
  
  name=$(echo "$d"|tr '-' ':'|cut -d'/' -f3)
  
  echo "$d"
  
  cd $d
  echo "## $name" > README.md
  meteor publish --create

  cd ../../private
done