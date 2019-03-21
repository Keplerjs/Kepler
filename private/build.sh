#!/bin/bash
#
#run this script by root
#kepler is a system user that has install meteor
#

BDIR="../kepler.bundle"
mkdir -p $BDIR
chmod -R 0775 $BDIR
chgrp -R kepler $BDIR

su kepler -c "meteor build --directory $BDIR"
#meteor build --directory
cd $BDIR/bundle/programs/server/
su kepler -c "npm install --production"
