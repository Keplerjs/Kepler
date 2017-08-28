for d in ../packages/* ; do
  
  #name=$(echo "$d"|tr '-' ':'|cut -d'/' -f3)
  
  echo "$d"
  
  cd $d
  
  meteor publish

  cd ../../private
done