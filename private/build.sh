#!/bin/bash

meteor build --directory ../kepler.bundle
cd ../kepler.bundle/programs/server/
npm install --production
cd ../../
##your process user:
#chgrp -R kepler .
#chmod -R 0775 .

#and run using kepler.daemon.sh
